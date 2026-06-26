// ── Load carrier configs and fill engine ─────────────────────────────────────
importScripts(
  'carriers/_registry.js',
  'carriers/one-line.js',
  'carriers/msc.js',
  'carriers/oocl.js',
  'carriers/track-trace.js',
  'carriers/evergreen.js',
  'carriers/cma-cgm.js',
  'carriers/maersk.js',
  'carriers/hmm.js',
  'carriers/hapag-lloyd.js',
  'carriers/cosco.js',
  'carriers/vanguard.js',
  'carriers/wan-hai.js',
  'carriers/yang-ming.js',
  'carriers/emirates.js',
  'carriers/zim.js',
  'carriers/sm-line.js',
  'carriers/hede-hk.js',
  'carriers/pil.js',
  'carriers/sea-lead.js',
  'carriers/seth-shipping.js',
  'engine/fill-engine.js'
);

// ── Build lookup tables after all carrier files are loaded ────────────────────
// MBL numbers and container numbers live in different namespaces, so each gets
// its own prefix → carrier map:
//   MBL_PREFIX_TO_CONFIG       : 4-char BL / booking prefix → carrier (1:1)
//   CONTAINER_PREFIX_TO_CONFIG : 4-char container owner code → carrier (many codes;
//                                only carrier-owned codes are registered here)
//   HOSTNAME_TO_CONFIG         : hostname → carrier config (used after tab loads)
const MBL_PREFIX_TO_CONFIG       = {};
const CONTAINER_PREFIX_TO_CONFIG = {};
const HOSTNAME_TO_CONFIG         = {};

for (const cfg of Object.values(CARRIER_CONFIGS)) {
  if (cfg.hostname) HOSTNAME_TO_CONFIG[cfg.hostname] = cfg;
  for (const prefix of (cfg.prefixes ?? [])) {
    MBL_PREFIX_TO_CONFIG[prefix.toUpperCase()] = cfg;
  }
  for (const prefix of (cfg.containerPrefixes ?? [])) {
    CONTAINER_PREFIX_TO_CONFIG[prefix.toUpperCase()] = cfg;
  }
}

// tabId -> { bookingNo, hostname, attempts, createdAt }
const pendingFills = new Map();

const MAX_ATTEMPTS = 15;
const MAX_AGE_MS   = 10 * 60 * 1000; // 10 minutes

// Strip non-serialisable fields (functions) before passing as executeScript arg
function toInjectableConfig(cfg) {
  if (!cfg) return null;
  const { scrape, ...rest } = cfg;
  return rest;
}

// ── Distinguish a container number from a BL / booking number ────────────────
// ISO 6346 container no.: 3-letter owner code + equipment category (U/J/Z) +
// 6-digit serial + 1 check digit, e.g. "ONEU1234567" or "TGHU 123456 7".
// Everything else (BL, booking, purchase order) is treated as 'bl'.
const CONTAINER_RE = /^[A-Z]{3}[UJZ]\d{7}$/;
function classifyQuery(value) {
  const normalized = (value ?? '').toUpperCase().replace(/[\s-]/g, '');
  return CONTAINER_RE.test(normalized) ? 'container' : 'bl';
}

// ── Carrier resolution — separate strategies for MBL vs container ─────────────
// MBL / booking: the 4-letter prefix maps 1:1 to a carrier, so a direct lookup
// in the BL namespace is authoritative.
function resolveCarrierByMbl(value) {
  const prefix = (value ?? '').trim().substring(0, 4).toUpperCase();
  return MBL_PREFIX_TO_CONFIG[prefix] ?? CARRIER_CONFIGS['TRTR'];
}

// Container: the owner code namespace is large and includes leased codes
// (TGHU, CAIU, FCIU, …) that belong to no single carrier. Try the dedicated
// container map first; fall back to the BL map for carrier-owned codes that also
// serve as a BL prefix (e.g. MSC's MEDU); otherwise hand off to the Track-Trace
// aggregator, which can identify the carrier from the box number itself.
function resolveCarrierByContainer(value) {
  const prefix = (value ?? '').trim().substring(0, 4).toUpperCase();
  return CONTAINER_PREFIX_TO_CONFIG[prefix]
      ?? MBL_PREFIX_TO_CONFIG[prefix]
      ?? CARRIER_CONFIGS['TRTR'];
}

// Dispatch to the right resolver based on the detected query type.
function resolveCarrier(value, queryType) {
  return queryType === 'container'
    ? resolveCarrierByContainer(value)
    : resolveCarrierByMbl(value);
}

// Web app used for manual carrier selection when the carrier can't be auto-detected.
// (For local dev, point this at 'http://localhost:4200'.)
const MANUAL_SELECT_URL = 'https://www.cargomar.in/extension/tracker.html';

// ── Shared: open carrier tab and queue form fill ─────────────────────────────
// scac        — optional: carrier chosen by the user in the app (overrides detection).
// senderTabId — optional: when the user picked a carrier in the app, navigate that same
//               tab to the carrier page (instead of opening a new one).
function openTracking(bookingNo, sendResponse, scac, senderTabId) {
  const searchType = classifyQuery(bookingNo);          // 'container' | 'bl'

  // An explicit SCAC (user picked the carrier in the app) overrides auto-detection.
  const chosen  = scac ? CARRIER_CONFIGS[scac.toUpperCase()] : null;
  const carrier = chosen ?? resolveCarrier(bookingNo, searchType);

  // No carrier detected and none chosen → send the user to the app to pick one,
  // instead of falling back to the Track-Trace aggregator.
  if (!chosen && carrier.scac === 'TRTR') {
    const sep = MANUAL_SELECT_URL.includes('?') ? '&' : '?';
    const appUrl = MANUAL_SELECT_URL + sep + 'refno=' + encodeURIComponent(bookingNo);
    console.log('[ShippingTracker] No carrier for "%s" — opening app for manual selection', bookingNo);
    chrome.tabs.create({ url: appUrl, active: true }, (tab) => {
      if (sendResponse) sendResponse({ success: true, tabId: tab.id, carrier: null, manualSelect: true });
    });
    return;
  }

  console.log('[ShippingTracker] Carrier: %s (%s)%s for: %s', carrier.scac, searchType, chosen ? ' [manual]' : '', bookingNo);

  // A container number must be searched whole (prefix included); only BL / booking
  // numbers get the 4-letter prefix stripped for carriers like ONE Line.
  const searchBookingNo = searchType === 'container'
    ? bookingNo.toUpperCase().replace(/[\s-]/g, '')
    : (carrier.stripPrefix ? bookingNo.substring(4) : bookingNo);

  // Resolve final URL — prefer a per-type template (e.g. COSCO: container vs B/L sets
  // the page's trackingType), then a generic urlTemplate, else the plain url.
  const template = carrier.urlTemplateByType?.[searchType] ?? carrier.urlTemplate;
  const finalUrl = (template && searchBookingNo)
    ? template.replace('{bookingNo}', encodeURIComponent(searchBookingNo))
    : carrier.url;

  // For URL-template carriers the number is already in the URL — no form filling needed
  const finalBookingNo = template ? '' : searchBookingNo;

  function queueFill(tabId) {
    if (carrier.openOnly) {
      console.log('[ShippingTracker] openOnly: opened %s without filling (diagnostic)', carrier.scac);
    } else if ((finalBookingNo || carrier.consentSelectors) && tabId != null) {
      // Inject to fill the form, OR (for URL-template carriers like Maersk that show
      // results directly) just to dismiss the cookie banner via consentSelectors.
      pendingFills.set(tabId, {
        bookingNo:  finalBookingNo,
        hostname:   carrier.hostname,
        searchType: searchType,
        attempts:   0,
        injected:   false,
        createdAt:  Date.now()
      });
    }
  }

  // Manual selection from the app → navigate the app's own tab (same page). Set the
  // pending fill first so the load events have it. Otherwise open a fresh tab.
  if (chosen && senderTabId != null) {
    queueFill(senderTabId);
    chrome.tabs.update(senderTabId, { url: finalUrl, active: true });
    if (sendResponse) sendResponse({ success: true, tabId: senderTabId, carrier: carrier.scac });
  } else {
    chrome.tabs.create({ url: finalUrl, active: true }, (tab) => {
      queueFill(tab.id);
      if (sendResponse) sendResponse({ success: true, tabId: tab.id, carrier: carrier.scac });
    });
  }
}

// ── Register context menu on install / update ─────────────────────────────────
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id:       'track-shipment',
    title:    'Track Shipment: "%s"',
    contexts: ['selection']
  });
});

// ── Context menu click — selected text on any page ────────────────────────────
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId !== 'track-shipment') return;
  const bookingNo = (info.selectionText ?? '').trim().toUpperCase();
  if (bookingNo) openTracking(bookingNo, null);
});

// ── Message from content-script ──────────────────────────────────────────────
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action !== 'OPEN_SHIPPING_URL') return;

  const bookingNo = (message.bookingNo ?? '').trim();

  if (!bookingNo) {
    sendResponse({ success: false, error: 'Missing booking number' });
    return;
  }

  // message.scac (optional) = carrier the user picked in the app; sender.tab.id lets us
  // reuse the app's own tab when they picked manually.
  openTracking(bookingNo, sendResponse, message.scac, sender.tab?.id);
  return true; // keep channel open for async sendResponse
});

// ── Shared injection logic ────────────────────────────────────────────────────
function attemptFill(tabId) {
  if (!pendingFills.has(tabId)) return;

  const entry = pendingFills.get(tabId);

  if (entry.attempts >= MAX_ATTEMPTS || Date.now() - entry.createdAt > MAX_AGE_MS) {
    console.warn('[ShippingTracker] Giving up on tab %d after %d attempts', tabId, entry.attempts);
    pendingFills.delete(tabId);
    return;
  }

  entry.attempts++;
  entry.injected = true;

  const carrierConfig = toInjectableConfig(HOSTNAME_TO_CONFIG[entry.hostname]);

  chrome.scripting.executeScript({
    target: { tabId },
    func:   fillBookingNumber,
    args:   [entry.bookingNo, entry.hostname, carrierConfig, entry.searchType]
  }).then(results => {
    const result = results?.[0]?.result;
    const filled = result?.ok === true;
    if (filled) {
      console.log('[ShippingTracker] Fill succeeded on tab %d (attempt %d): submit=%s', tabId, entry.attempts, result.submit);
      pendingFills.delete(tabId);
    } else {
      console.log('[ShippingTracker] Fill not done on tab %d (attempt %d), waiting for next load…', tabId, entry.attempts);
    }
  }).catch(err => {
    console.error('[ShippingTracker] Script injection failed (attempt %d):', entry.attempts, err);
  });
}

// We inject only after the page has fully loaded (tabs.onUpdated 'complete' below),
// never on DOMContentLoaded — so our script never competes with the page's own loading.

// A new top-level navigation in a pending tab (e.g. OOCL's bot-check / "verify you are
// human" page → the real tracking page after the user passes it) clears the injected
// flag, so the next 'complete' re-injects and the fill is retried on the real page.
// We do NOT attempt the verification itself — the user completes that.
chrome.webNavigation.onCommitted.addListener(({ tabId, frameId }) => {
  if (frameId !== 0) return; // main frame only
  const entry = pendingFills.get(tabId);
  if (entry) entry.injected = false;
});

// ── Inject once the page has fully loaded (all carriers) ─────────────────────
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status !== 'complete') return;
  if (!pendingFills.has(tabId)) return;

  const entry = pendingFills.get(tabId);
  if (entry.injected) return; // already injected for this page load

  attemptFill(tabId);
});

// ── Clean up when user closes the tab ────────────────────────────────────────
chrome.tabs.onRemoved.addListener((tabId) => {
  if (pendingFills.has(tabId)) {
    console.log('[ShippingTracker] Tab %d closed — removing pending fill', tabId);
    pendingFills.delete(tabId);
  }
});

// ── Injected into the carrier page (must be self-contained) ──────────────────
// Invoked via: chrome.scripting.executeScript({ func: fillBookingNumber, args: [bookingNo, hostname, config, searchType] })
// Returns true if the BL number was typed and submitted, false if no input was found (e.g. Cloudflare page).
// searchType ('container' | 'bl') picks the carrier's search-category dropdown before typing.
async function fillBookingNumber(bookingNo, hostname, config, searchType) {

  config = config ?? {
    inputSelectors: ['input[type="search"]', 'input[type="text"]:not([type="hidden"])'],
    submitSelectors: [],
    submitMethod: 'enter'
  };

  // ── Helpers ────────────────────────────────────────────────────────────────

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const rand  = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  function keyProps(char) {
    const upper = char.toUpperCase();
    const code  = /[A-Z]/.test(upper) ? `Key${upper}` : /[0-9]/.test(char) ? `Digit${char}` : char;
    const kc    = upper.charCodeAt(0);
    return { key: char, code, keyCode: kc, which: kc, charCode: char.charCodeAt(0) };
  }

  function getNativeAccessors(el) {
    const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    return {
      get: Object.getOwnPropertyDescriptor(proto, 'value')?.get,
      set: Object.getOwnPropertyDescriptor(proto, 'value')?.set
    };
  }

  // ── Human-like focus (mouse hover → down → up → click) ────────────────────

  async function humanFocus(el) {
    const rect = el.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2 + rand(-5, 5);
    const cy   = rect.top  + rect.height / 2 + rand(-3, 3);
    const opts = { bubbles: true, cancelable: true, clientX: cx, clientY: cy };

    el.dispatchEvent(new MouseEvent('mouseover', opts));
    await sleep(rand(60, 140));
    el.dispatchEvent(new MouseEvent('mousemove', opts));
    await sleep(rand(30, 80));
    el.dispatchEvent(new MouseEvent('mousedown', { ...opts, buttons: 1 }));
    await sleep(rand(40, 90));
    el.dispatchEvent(new MouseEvent('mouseup',   opts));
    el.dispatchEvent(new MouseEvent('click',     opts));
    el.focus();
    await sleep(rand(80, 160));
  }

  // ── Clear existing content ─────────────────────────────────────────────────

  async function clearField(el) {
    const { set } = getNativeAccessors(el);
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', code: 'KeyA', keyCode: 65, ctrlKey: true, bubbles: true }));
    el.dispatchEvent(new KeyboardEvent('keyup',   { key: 'a', code: 'KeyA', keyCode: 65, ctrlKey: true, bubbles: true }));
    await sleep(rand(40, 80));
    el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', code: 'Backspace', keyCode: 8, bubbles: true }));
    if (set) set.call(el, ''); else el.value = '';
    el.dispatchEvent(new InputEvent('input', { inputType: 'deleteContentBackward', bubbles: true }));
    el.dispatchEvent(new KeyboardEvent('keyup', { key: 'Backspace', code: 'Backspace', keyCode: 8, bubbles: true }));
    await sleep(rand(60, 120));
  }

  // ── Type one character with full realistic event sequence ──────────────────

  async function typeChar(el, char) {
    const p  = keyProps(char);
    const ac = getNativeAccessors(el);

    el.dispatchEvent(new KeyboardEvent('keydown',  { ...p, bubbles: true, cancelable: true }));
    el.dispatchEvent(new KeyboardEvent('keypress', { ...p, bubbles: true, cancelable: true }));

    // Append via native setter so React / Alpine / Vue state stays in sync
    const cur = ac.get ? ac.get.call(el) : el.value;
    if (ac.set) ac.set.call(el, cur + char); else el.value = cur + char;

    el.dispatchEvent(new InputEvent('input', {
      inputType: 'insertText', data: char, bubbles: true, cancelable: true
    }));
    el.dispatchEvent(new KeyboardEvent('keyup', { ...p, bubbles: true, cancelable: true }));

    // Human keystroke interval: 60–150 ms, occasional longer pause
    await sleep(Math.random() < 0.1 ? rand(200, 400) : rand(60, 150));
  }

  // ── Set entire value at once (for sites whose keydown handlers conflict) ─────

  async function instantFill(el, text) {
    await humanFocus(el);
    await clearField(el);
    await sleep(rand(100, 200));

    const { set } = getNativeAccessors(el);
    if (set) set.call(el, text); else el.value = text;

    el.dispatchEvent(new InputEvent('input',  { inputType: 'insertFromPaste', data: text, bubbles: true, cancelable: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    await sleep(rand(80, 150));
    console.log('[ShippingTracker] Instant-filled "%s" on %s', text, hostname);
  }

  // ── Type whole string (char-by-char default, or instant for problem sites) ──

  async function humanType(el, text) {
    if (config.typeMethod === 'instant') {
      await instantFill(el, text);
      return;
    }
    await humanFocus(el);
    await clearField(el);
    for (const ch of text) await typeChar(el, ch);
    console.log('[ShippingTracker] Typed "%s" on %s', text, hostname);
  }

  // ── Submit helpers ─────────────────────────────────────────────────────────

  async function humanClick(el) {
    const rect = el.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2 + rand(-4, 4);
    const cy   = rect.top  + rect.height / 2 + rand(-3, 3);
    const opts = { bubbles: true, cancelable: true, clientX: cx, clientY: cy };
    el.dispatchEvent(new MouseEvent('mouseover', opts));
    await sleep(rand(50, 120));
    el.dispatchEvent(new MouseEvent('mousedown', { ...opts, buttons: 1 }));
    await sleep(rand(40, 90));
    el.dispatchEvent(new MouseEvent('mouseup',   opts));
    // Native .click() reliably fires inline onclick handlers (e.g. Wan Hai's
    // JSF jsf.util.chain) across machines where a synthetic click event was
    // intermittently missed. Fall back to a synthetic click only if unavailable.
    if (typeof el.click === 'function') el.click();
    else el.dispatchEvent(new MouseEvent('click', opts));
  }

  async function pressEnter(el) {
    const p = { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, charCode: 13 };
    el.dispatchEvent(new KeyboardEvent('keydown',  { ...p, bubbles: true, cancelable: true }));
    await sleep(rand(40, 80));
    el.dispatchEvent(new KeyboardEvent('keypress', { ...p, bubbles: true, cancelable: true }));
    await sleep(rand(30, 60));
    el.dispatchEvent(new KeyboardEvent('keyup',    { ...p, bubbles: true, cancelable: true }));
    console.log('[ShippingTracker] Pressed Enter on %s', hostname);
  }

  async function submitForm(filledEl) {
    await sleep(rand(300, 600)); // natural pause before submitting

    if (config.submitMethod === 'enter') {
      await pressEnter(filledEl);
      return 'enter';
    }

    if (config.submitMethod === 'request-submit') {
      const form = filledEl.closest('form');
      if (form) {
        // Wait for Alpine.js to enable the submit button before submitting
        const btn = document.querySelector(config.submitSelectors[0]);
        if (btn) {
          for (let i = 0; i < 8 && btn.disabled; i++) await sleep(150);
        }
        try {
          form.requestSubmit();
          console.log('[ShippingTracker] form.requestSubmit() → Alpine @submit.prevent="search"');
        } catch {
          form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }
        return 'request-submit';
      }
    }

    // Try carrier-specific submit buttons. Retry over several seconds: on slower
    // machines the button can render/lay-out slightly after the input is filled,
    // so a single attempt would miss it and the click would never land.
    const SUBMIT_RETRIES = 12; // ~12 × 300 ms ≈ 3.6 s
    for (let attempt = 0; attempt < SUBMIT_RETRIES; attempt++) {
      for (const sel of config.submitSelectors) {
        try {
          const btn = document.querySelector(sel);
          if (!btn) continue;
          // Skip only if truly not rendered yet (gives it another retry).
          if (btn.offsetParent === null && btn.getBoundingClientRect().width === 0) continue;
          // Wait up to 1 s for framework to enable the button
          for (let i = 0; i < 7 && btn.disabled; i++) await sleep(150);
          if (btn.disabled) { btn.disabled = false; btn.removeAttribute('disabled'); }
          await humanClick(btn);
          console.log('[ShippingTracker] Clicked submit via: %s (attempt %d)', sel, attempt + 1);
          return 'click:' + sel;
        } catch {}
      }
      await sleep(300); // button not ready yet — wait and retry
    }
    console.warn('[ShippingTracker] Submit button never became clickable on %s', hostname);

    // Fallback: find submit button in the same form
    const form = filledEl.closest('form');
    if (form) {
      const btn = form.querySelector('button[type="submit"], input[type="submit"], a[onclick]');
      if (btn) { await humanClick(btn); return 'click:form-fallback'; }
      form.submit();
      return 'form-submit';
    }

    await pressEnter(filledEl);
    return 'enter-fallback';
  }

  // ── Cookie / consent banner dismissal ─────────────────────────────────────

  const CONSENT_SELECTORS = [
    // Carrier-specific override
    ...(config.consentSelectors ?? []),
    // Generic patterns
    'button.I-agree', 'button.i-agree',
    'button[class*="agree" i]',
    'button[id*="agree" i]',
    'a[class*="agree" i]',
    'input[value*="agree" i]',
    'button[class*="accept" i]',
    'button[id*="accept" i]',
    'a[class*="accept" i]',
    'button[class*="consent" i]',
    'button[id*="consent" i]',
  ];

  async function dismissConsentBanner() {
    // Also match buttons/links whose visible text contains agree/accept
    const textMatch = [...document.querySelectorAll('button, a, input[type="button"], input[type="submit"]')]
      .find(el => /^\s*(i\s+)?agree\s*$|^\s*accept(\s+all)?\s*$/i.test(el.textContent?.trim() ?? el.value ?? ''));

    const el = CONSENT_SELECTORS.map(s => document.querySelector(s)).find(Boolean) ?? textMatch ?? null;

    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;

    await humanClick(el);
    console.log('[ShippingTracker] Dismissed consent banner on %s', hostname);
    await sleep(rand(400, 700)); // let the banner animate away
  }

  // ── Search-category dropdown (e.g. ONE's "BL No." vs "Container No.") ───────
  // Works with both a Headless-UI listbox (ONE) and a bootstrap-select dropdown
  // (OOCL). The current value is read from the live control, so it copes with a
  // non-deterministic default (OOCL remembers the last-used type).
  // Returns: 'unchanged' (already the wanted type), 'changed' (an option was
  // clicked — which clears OOCL's input), or false (not displayed / not found).
  //   opts.wait — poll until the trigger is displayed (some sites render it only
  //               after the number is typed); up to ~5 s, then give up.

  async function selectSearchType(wantedKey, opts = {}) {
    const st = config.searchType;
    if (!st) return 'unchanged';                            // carrier has no such dropdown
    const label = (st.labels ?? {})[wantedKey];
    if (!label) return 'unchanged';                         // category not configured — leave default

    const triggerSel = st.triggerSelector || 'button[aria-haspopup="listbox"]';
    const labelLc    = label.trim().toLowerCase();
    // Match on startsWith so a config label of "Container" matches a rendered
    // option/label like "Container #" or "Container No.". Check both the visible
    // text and the title attribute (OOCL's bootstrap-select button carries the
    // current value in title="Container #" as well as in its .filter-option span).
    const norm    = s => (s || '').trim().toLowerCase();
    const matches = el => norm(el?.textContent).startsWith(labelLc)
                       || norm(el?.getAttribute?.('title')).startsWith(labelLc);
    const visible = el => !!el && el.getBoundingClientRect().width > 0;

    // Locate the trigger, optionally waiting until it is actually displayed
    let trigger = document.querySelector(triggerSel);
    if (opts.wait) {
      for (let i = 0; i < 25 && !visible(trigger); i++) { await sleep(200); trigger = document.querySelector(triggerSel); }
    }
    if (!visible(trigger)) return false;                    // dropdown not displayed

    if (matches(trigger)) return 'unchanged';               // default is already the wanted type

    // Open the menu (both widgets render/enable options once expanded)
    if (trigger.getAttribute('aria-expanded') !== 'true') {
      await humanClick(trigger);
      await sleep(rand(200, 350));
    }

    // Pick the option whose visible text matches the wanted label
    let opt = null;
    for (let i = 0; i < 12 && !opt; i++) {
      opt = [...document.querySelectorAll(st.optionSelector || '[role="option"]')].find(matches);
      if (!opt) await sleep(120);
    }
    if (!opt) return false;

    await humanClick(opt);
    await sleep(rand(250, 400));
    if (!matches(document.querySelector(triggerSel))) return false;
    console.log('[ShippingTracker] Search type set to "%s" on %s', label, hostname);
    return 'changed';
  }

  // ── Main: find input → type → submit ──────────────────────────────────────

  let busy = false;
  // afterInput carriers (OOCL): the type dropdown only appears once a number is typed,
  // so it's handled post-fill rather than as a pre-fill gate.
  const afterInput = !!config.searchType?.afterInput;
  let searchTypeReady = !config.searchType || afterInput;

  async function tryFill() {
    if (busy) return null;
    busy = true;

    // Pre-fill case (ONE): set the search category before filling the input.
    if (!searchTypeReady) {
      searchTypeReady = await selectSearchType(searchType, { wait: true });
      if (!searchTypeReady) { busy = false; return null; } // retry on next mutation
    }

    for (const sel of config.inputSelectors) {
      try {
        const el = document.querySelector(sel);
        if (!el || el.disabled || el.readOnly) continue;
        if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;

        await humanType(el, bookingNo);

        // Post-fill case (OOCL — tricky): after typing, the type dropdown renders.
        // Wait until it is displayed, then select the right category. The default is
        // non-deterministic, so only re-enter the number when an option was actually
        // clicked ('changed') — that's what clears the input. If it was already the
        // wanted type ('unchanged') or never showed (false), the typed value stays.
        if (afterInput) {
          const result = await selectSearchType(searchType, { wait: true }); // waits until displayed
          if (result === 'changed') {
            await sleep(rand(150, 300));                           // let the input clear settle
            const again = document.querySelector(sel) || el;       // selecting may re-render
            await humanType(again, bookingNo);                     // enter the value again
          }
        }

        const submit = await submitForm(document.querySelector(sel) || el);
        return { ok: true, stage: 'submitted', inputSelector: sel, submit };
      } catch {}
    }
    busy = false; // no input found this round — allow the SPA observer to retry
    return null;
  }

  // Optional per-carrier delay before first attempt (e.g. SPA needing extra init time).
  // Note: we intentionally do NOT wait for document.readyState === 'complete' — that
  // blocks on slow trailing resources (ads/analytics) and can delay the search by many
  // seconds. We wait only for the elements we need, via the polls below.
  if (config.initialDelay) await sleep(config.initialDelay);

  await dismissConsentBanner();

  const first = await tryFill();
  if (first) return first;

  // SPA fallback: watch for dynamic content and retry up to 15 s.
  // The callback is debounced and non-reentrant: a busy page (e.g. OOCL) can fire
  // hundreds of mutations during load, and each attempt does full-document scans
  // (dismissConsentBanner / input lookup). Running those on every mutation would
  // saturate the page's main thread and make it load far slower, so coalesce bursts
  // of mutations into at most one attempt per ~400 ms.
  return new Promise((resolve) => {
    let spaAttempts = 0;
    let scheduled = false;
    let running = false;

    const finish = (result) => { observer.disconnect(); clearTimeout(timer); resolve(result); };

    async function attempt() {
      if (running || busy) return;
      running = true;
      try {
        await dismissConsentBanner();
        const r = await tryFill();
        if (r) return finish(r);
        if (++spaAttempts >= 40) return finish({ ok: false, stage: 'no-input' });
      } finally {
        running = false;
      }
    }

    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      setTimeout(() => { scheduled = false; attempt(); }, 400); // debounce mutation bursts
    });
    observer.observe(document.body ?? document.documentElement, { childList: true, subtree: true });
    const timer = setTimeout(() => finish({ ok: false, stage: 'no-input' }), 15_000); // overall cap
  });
}

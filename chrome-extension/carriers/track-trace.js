// Track-Trace (multi-carrier aggregator)
CARRIER_CONFIGS['TRTR'] = {
  scac:     'TRTR',
  prefixes:    [], // fallback only — used when no other carrier matches
  stripPrefix: false,
  hostname: 'www.track-trace.com',
  url:      'https://www.track-trace.com/bol',
  inputSelectors: [
    'input[name="number"]',
    'input[name="bol"]',
    'input[name="query"]',
    'input[placeholder*="Lading" i]',
    'input[placeholder*="Bill" i]',
    'input[placeholder*="number" i]',
    'input[type="text"]:not([type="hidden"])'
  ],
  submitSelectors: [
    'input[type="submit"][value*="Track" i]',
    'input[type="submit"]',
    'button[type="submit"]'
  ],
  submitMethod: 'click',

  scrape() {
    // TODO: extract tracking results from Track-Trace page
  }
};

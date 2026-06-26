// HMM (Hyundai Merchant Marine)
CARRIER_CONFIGS['HDMU'] = {
  scac:     'HDMU',
  prefixes:    ['HDMU', 'HYDA'],
  containerPrefixes: ['HDMU', 'HMMU', 'HAMU'],
  stripPrefix: false,
  hostname: 'www.hmm21.com',
  url:      'https://www.hmm21.com/e-service/general/trackNTrace/TrackNTrace.do',
  // Inject after page load so our script doesn't compete with the page's init.
  injectOnComplete: true,
  // HMM has dedicated fields per search type — BL → srchBlNo1, Container → srchCntrNo1 —
  // so pick the input by search type rather than a shared box.
  inputSelectorsByType: {
    container: ['input[name="srchCntrNo1"]', 'input[data-format-input="CNo"]'],
    bl:        ['input[name="srchBlNo1"]', 'input[data-format-input="BLNo"]']
  },
  inputSelectors: [
    'input[name="blNo"]',
    'textarea[name="blNo"]',
    'input[id="blNo"]',
    'input[name="trackNo"]',
    'input[id="trackNo"]',
    'input[name="cntrNo"]',
    'textarea[name="cntrNo"]',
    'input[placeholder*="B/L" i]',
    'input[placeholder*="tracking" i]',
    'input[type="text"]:not([type="hidden"])'
  ],
  // Search button is <button onclick="search()">Retrieve</button> (the engine clicks the
  // first visible match, so the right tab's button is used).
  submitSelectors: [
    'button[onclick="search()"]',
    'button[onclick*="search" i]',
    'input[type="submit"]',
    'input[type="image"]',
    'button[type="submit"]',
    'a[onclick*="search" i]',
    'a[onclick*="track" i]'
  ],
  submitMethod: 'click',
  typeMethod: 'instant',   // set the value directly instead of typing char-by-char

  scrape() {
    // TODO: extract tracking results from HMM page
  }
};

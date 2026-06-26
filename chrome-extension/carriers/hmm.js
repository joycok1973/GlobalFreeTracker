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
  // HMM has a dedicated container field (srchCntrNo1) separate from the BL field, so
  // pick the input by search type: container numbers go into srchCntrNo1.
  inputSelectorsByType: {
    container: ['input[name="srchCntrNo1"]', 'input[data-format-input="CNo"]']
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
  submitSelectors: [
    'input[type="submit"]',
    'input[type="image"]',
    'button[type="submit"]',
    'a[onclick*="search" i]',
    'a[onclick*="track" i]'
  ],
  submitMethod: 'click',

  scrape() {
    // TODO: extract tracking results from HMM page
  }
};

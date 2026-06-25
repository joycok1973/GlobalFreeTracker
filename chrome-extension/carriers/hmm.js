// HMM (Hyundai Merchant Marine)
CARRIER_CONFIGS['HDMU'] = {
  scac:     'HDMU',
  prefixes:    ['HDMU', 'HYDA'],
  containerPrefixes: ['HDMU', 'HMMU'],
  stripPrefix: false,
  hostname: 'www.hmm21.com',
  url:      'https://www.hmm21.com/e-service/general/trackNTrace/TrackNTrace.do',
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

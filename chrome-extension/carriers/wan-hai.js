// Wan Hai Lines
CARRIER_CONFIGS['WHLC'] = {
  scac:     'WHLC',
  prefixes:    ['WHLC'],
  containerPrefixes: ['WHLU', 'WHSU'],
  stripPrefix: true,
  hostname: 'www.wanhai.com',
  url:      'https://www.wanhai.com/views/cargo_track_v2/tracking_query.xhtml',
  inputSelectors: [
    '#q_ref_no1',
    'input[name="q_ref_no1"]',
    'input[type="text"]:not([type="hidden"])'
  ],
  submitSelectors: [
    '#Query',
    'input[name="Query"]',
    'input[type="submit"][value="Query"]'
  ],
  submitMethod: 'click',

  scrape() {
    // TODO: extract tracking results from Wan Hai page
  }
};

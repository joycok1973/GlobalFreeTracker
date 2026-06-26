// Emirates Shipping Line
CARRIER_CONFIGS['EMIU'] = {
  scac:     'EMIU',
  prefixes:    ['EMIV', 'EMIU', 'ESPU'],
  // Emirates Shipping Line container owner codes. (EMKU was wrong — that's Emkay Lines,
  // a different company; EMIU is the BL/SCAC prefix, covered by the resolver fallback.)
  containerPrefixes: ['ESPU', 'ESDU'],
  stripPrefix: false,
  hostname: 'www.emiratesline.com',
  url:      'https://www.emiratesline.com/track/',
  inputSelectors: [
    '#containerNumber',
    'input[name="containerNumber"]',
    'input[type="text"]:not([type="hidden"])'
  ],
  submitSelectors: [
    'button.primary-btn[type="submit"]',
    'button[type="submit"]'
  ],
  submitMethod: 'click',

  scrape() {
    // TODO: extract tracking results from Emirates Shipping page
  }
};

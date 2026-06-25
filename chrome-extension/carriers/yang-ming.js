// Yang Ming Marine Transport
CARRIER_CONFIGS['YMLU'] = {
  scac:     'YMLU',
  prefixes:    ['YMLU', 'YMJA'],
  containerPrefixes: ['YMLU', 'YMMU'],
  stripPrefix: false,
  hostname: 'www.yangming.com',
  url:      'https://www.yangming.com/en/esolution/cargo_tracking',
  inputSelectors: [
    'input[id*="blNo" i]',
    'input[name*="blNo" i]',
    'input[id*="bl_no" i]',
    'input[name*="bl_no" i]',
    'input[id*="trackNo" i]',
    'input[name*="trackNo" i]',
    'input[id*="ref" i]',
    'input[name*="ref" i]',
    'input[placeholder*="B/L" i]',
    'input[placeholder*="booking" i]',
    'input[placeholder*="tracking" i]',
    'input[type="search"]',
    'input[type="text"]:not([type="hidden"])'
  ],
  submitSelectors: [],
  submitMethod: 'enter',

  scrape() {
    // TODO: extract tracking results from Yang Ming page
  }
};

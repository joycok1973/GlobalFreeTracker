// Hapag-Lloyd
CARRIER_CONFIGS['HLCU'] = {
  scac:     'HLCU',
  prefixes:    ['HLCU', 'HLXU'],
  stripPrefix: false,
  hostname: 'www.hapag-lloyd.com',
  url:      'https://www.hapag-lloyd.com/en/home.html',
  inputSelectors: [
    'input[placeholder*="B/L" i]',
    'input[placeholder*="booking" i]',
    'input[placeholder*="container" i]',
    'input[placeholder*="reference" i]',
    'input[placeholder*="tracking" i]',
    'input[id*="search" i]',
    'input[name*="search" i]',
    'input[id*="track" i]',
    'input[name*="track" i]',
    'input[type="search"]',
    'input[type="text"]:not([type="hidden"])'
  ],
  submitSelectors: [
    'button[type="submit"]',
    'button[id*="search" i]',
    'button[id*="track" i]'
  ],
  submitMethod: 'enter',

  scrape() {
    // TODO: extract tracking results from Hapag-Lloyd page
  }
};

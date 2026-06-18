// ZIM Integrated Shipping Services
CARRIER_CONFIGS['ZIMU'] = {
  scac:     'ZIMU',
  prefixes:    ['ZIMU'],
  stripPrefix: false,
  hostname: 'www.zim.com',
  url:      'https://www.zim.com/tools/track-a-shipment',
  inputSelectors: [
    'input[id*="track" i]',
    'input[name*="track" i]',
    'input[id*="search" i]',
    'input[name*="search" i]',
    'input[placeholder*="B/L" i]',
    'input[placeholder*="booking" i]',
    'input[placeholder*="tracking" i]',
    'input[placeholder*="shipment" i]',
    'input[placeholder*="reference" i]',
    'input[type="search"]',
    'input[type="text"]:not([type="hidden"])'
  ],
  submitSelectors: [
    'input.chips-search-button[type="submit"]',
    'input[type="submit"][value="Search"]'
  ],
  submitMethod: 'click',

  scrape() {
    // TODO: extract tracking results from ZIM page
  }
};

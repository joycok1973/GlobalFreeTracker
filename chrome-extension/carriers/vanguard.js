// Vanguard Logistics
CARRIER_CONFIGS['VSLG'] = {
  scac:     'VSLG',
  prefixes:    ['VSLG'],
  stripPrefix: true,
  hostname: 'portal.vanguardlogistics.com',
  url:      'https://portal.vanguardlogistics.com/apps/quick-track/',
  inputSelectors: [
    'input[placeholder*="booking" i]',
    'input[placeholder*="tracking" i]',
    'input[placeholder*="number" i]',
    'input[id*="booking" i]',
    'input[name*="booking" i]',
    'input[id*="track" i]',
    'input[name*="track" i]',
    'input[type="search"]',
    'input[type="text"]:not([type="hidden"])'
  ],
  submitSelectors: [
    'input[type="submit"][value="Track"]',
    'input[type="submit"]'
  ],
  submitMethod: 'click',

  scrape() {
    // TODO: extract tracking results from Vanguard page
  }
};

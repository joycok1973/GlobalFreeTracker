// CMA CGM
CARRIER_CONFIGS['CMDU'] = {
  scac:     'CMDU',
  prefixes:    ['CMDU', 'CGMU'],
  containerPrefixes: ['CMAU', 'CGMU', 'CMCU', 'ECMU', 'APLU', 'APRU', 'APHU', 'ANLU', 'CNCU'], // incl. APL / ANL / CNC
  stripPrefix: true,
  hostname: 'www.cma-cgm.com',
  url:      'https://www.cma-cgm.com/ebusiness/tracking',
  inputSelectors: [
    'input[placeholder*="reference" i]',
    'input[placeholder*="B/L" i]',
    'input[placeholder*="tracking" i]',
    'input[placeholder*="container" i]',
    'input[name*="tracking" i]',
    'input[id*="tracking" i]',
    'input[name*="reference" i]',
    'input[id*="reference" i]',
    'input[type="search"]',
    'input[type="text"]:not([type="hidden"])'
  ],
  submitSelectors: [
    '#btnTracking',
    'button[name="search"]',
    'button.o-button.primary[type="submit"]'
  ],
  submitMethod: 'click',

  scrape() {
    // TODO: extract tracking results from CMA CGM page
  }
};

// HEDE Hong Kong
CARRIER_CONFIGS['HDUJ'] = {
  scac: 'HDUJ',
  prefixes: ['HDUJ'],
  stripPrefix: false,
  hostname: 'elines.hedehk.com',
  url: 'http://elines.hedehk.com/cargoDynamicEN',
  inputSelectors: [
    'input#billno',
    'input[name="billno"]'
  ],
  submitSelectors: [
    'input.search-btn[type="button"]',
    'input[onclick*="findbill"]'
  ],
  submitMethod: 'click',

  scrape() {
    // TODO: extract tracking results from HEDE Hong Kong page
  }
};

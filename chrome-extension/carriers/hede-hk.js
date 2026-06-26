// HEDE Hong Kong
CARRIER_CONFIGS['HDUJ'] = {
  scac: 'HDUJ',
  prefixes: ['HDUJ'],
  containerPrefixes: ['HDUJ'], // HEDE containers are HDUJ + 7 digits (ISO 6346, category J)
  stripPrefix: false,
  hostname: 'elines.hedehk.com',
  url: 'http://elines.hedehk.com/cargoDynamicEN',
  // HEDE has a dedicated container field (#cntr) separate from the BL field (#billno).
  inputSelectorsByType: {
    container: ['input#cntr', 'input[name="cntr"]'],
    bl:        ['input#billno', 'input[name="billno"]']
  },
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

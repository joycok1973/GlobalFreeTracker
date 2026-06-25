// SM Line (Shanghai Minsheng Shipping)
CARRIER_CONFIGS['SMLU'] = {
  scac:        'SMLU',
  prefixes:    ['SMLM'],
  containerPrefixes: ['SMLU'],
  stripPrefix: true,   // SM Line search does not use the prefix
  hostname:    'esvc.smlines.com',
  url:         'https://esvc.smlines.com/smline/CUP_HOM_3301.do',
  inputSelectors: [
    'textarea#searchName',
    'textarea[name="searchName"]',
    'input#searchName',
    'input[name="searchName"]'
  ],
  submitSelectors: [
    'button#btnSearch',
    'button.ui-button'
  ],
  submitMethod: 'click',
  typeMethod:   'instant',

  scrape() {
    // TODO: extract tracking results from SM Line page
  }
};

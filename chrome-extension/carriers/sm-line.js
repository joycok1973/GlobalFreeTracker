// SM Line (Shanghai Minsheng Shipping)
CARRIER_CONFIGS['SMLU'] = {
  scac:        'SMLU',
  prefixes:    ['SMLM'],
  // SMCU is SM Line's container owner code. (SMLU is Seaboard Marine, a different
  // carrier — only SM Line's SCAC, not its container BIC, so it's not used here.)
  containerPrefixes: ['SMCU'],
  stripPrefix: true,   // SM Line search does not use the prefix
  hostname:    'esvc.smlines.com',
  url:         'https://esvc.smlines.com/smline/CUP_HOM_3301.do',
  // Search type is a native <select id="searchType">: B = BL/Booking, C = Container,
  // P = Purchase Order. Select the matching one before typing.
  searchType: {
    mode:     'select',
    selector: '#searchType',
    values:   { container: 'C', bl: 'B' }
  },
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

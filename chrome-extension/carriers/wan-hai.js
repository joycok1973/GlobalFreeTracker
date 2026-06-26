// Wan Hai Lines
CARRIER_CONFIGS['WHLC'] = {
  scac:     'WHLC',
  prefixes:    ['WHLC'],
  containerPrefixes: ['WHLU', 'WHSU', 'TPCU'],
  stripPrefix: true,
  hostname: 'www.wanhai.com',
  url:      'https://www.wanhai.com/views/Main.xhtml',
  // Search type is a native <select id="cargoType">: 2 = Book No./BL no., 1 = Ctnr No.,
  // 3 = Release Number. Pick the matching option before typing.
  searchType: {
    mode:     'select',
    selector: '#cargoType',
    values:   { container: '1', bl: '2' }
  },
  inputSelectors: [
    '#q_ref_no1',
    'input[name="q_ref_no1"]',
    'input[type="text"]:not([type="hidden"])'
  ],
  submitSelectors: [
    '#Query',
    'input[name="Query"]',
    'input[type="submit"][value="Query"]'
  ],
  submitMethod: 'click',

  scrape() {
    // TODO: extract tracking results from Wan Hai page
  }
};

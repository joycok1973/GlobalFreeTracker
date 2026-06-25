// OOCL (Orient Overseas Container Line)
CARRIER_CONFIGS['OOLU'] = {
  scac:     'OOLU',
  prefixes:    ['OOLU', 'OOCL'],
  containerPrefixes: ['OOLU', 'OOCU', 'FFAU'], // FFAU = Florens (COSCO/OOCL group leasing arm)
  stripPrefix: false,
  hostname: 'www.oocl.com',
  url:      'https://www.oocl.com/eng/ourservices/eservices/cargotracking/pages/cargotracking.aspx',
  inputSelectors: [
    '#SEARCH_NUMBER',
    'input[name="SEARCH_NUMBER"]',
    'input.filter-input',
    'input[type="text"]:not([type="hidden"])'
  ],
  submitSelectors: ['#container_btn', 'a.btn-red[onclick*="ListeningCargoTrackingBtn"]'],
  submitMethod: 'click',

  // OOCL's search-type selector is a bootstrap-select dropdown (default "Booking #")
  // that renders after the number is entered, so it's set post-fill (afterInput).
  // Only the container category is configured — BL/booking searches leave the
  // dropdown at its default so a booking number isn't forced to "Bill of Lading".
  searchType: {
    afterInput:      true,
    triggerSelector: '.bootstrap-select button.dropdown-toggle', // bootstrap-select button (shows .filter-option)
    optionSelector:  '.bootstrap-select .dropdown-menu li a',    // bootstrap-select option links
    labels: {
      container: 'Container'   // matches the "Container #" option
    }
  },

  scrape() {
    // TODO: extract tracking results from OOCL page
  }
};

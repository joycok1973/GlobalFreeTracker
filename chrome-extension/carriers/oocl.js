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

  // OOCL's search-type selector is a bootstrap-select dropdown (#ooclCargoSelector,
  // wrapper class .cargoTrackingDropDrown). It only appears after a number is entered,
  // and selecting a category clears the input. So the flow is afterInput: type the
  // number -> pick the category -> re-type the number -> submit (handled by the engine).
  // Both categories are set explicitly because OOCL's own auto-detect mis-reads a Bill
  // of Lading number (OOLU + 8-12 digits, e.g. OOLU2327208850) as a container.
  // Options: "B/L #" (bl) · "Booking #" (booking) · "Container #" (cont).
  searchType: {
    afterInput:      true,
    triggerSelector: '.cargoTrackingDropDrown button.dropdown-toggle', // bootstrap-select button
    optionSelector:  '.cargoTrackingDropDrown .dropdown-menu li a',    // option links (<span class="text">)
    labels: {
      container: 'Container',   // -> "Container #"
      bl:        'B/L'          // -> "B/L #"  (OOLU + 8-12 digits)
    }
  },

  scrape() {
    // TODO: extract tracking results from OOCL page
  }
};

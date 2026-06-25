// OOCL (Orient Overseas Container Line)
CARRIER_CONFIGS['OOLU'] = {
  scac:     'OOLU',
  prefixes:    ['OOLU', 'OOCL'],
  containerPrefixes: ['OOLU', 'OOCU', 'FFAU'], // FFAU = Florens (COSCO/OOCL group leasing arm)
  stripPrefix: false,
  // Wait for the page to load completely before filling — OOCL's input and
  // bootstrap-select dropdown are only initialized once the page has fully loaded
  // (the extension injects on DOMContentLoaded, which is earlier).
  waitForLoad: true,
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

  // OOCL is tricky: the search-type dropdown (#ooclCargoSelector, wrapper
  // .cargoTrackingDropDrown) only appears a moment AFTER a number is typed, and
  // selecting a category clears the input. Flow (afterInput): type the number -> wait
  // until the dropdown is displayed -> pick the category -> re-enter the number ->
  // click search. Options: "B/L #" (bl) · "Booking #" (booking) · "Container #" (cont).
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

// PIL (Pacific International Lines)
CARRIER_CONFIGS['PABV'] = {
  scac:        'PABV',
  prefixes:    ['PABV'],
  containerPrefixes: ['PCIU'],
  stripPrefix: true,   // PIL search uses the BL number without the PABV prefix
  hostname:    'www.pilship.com',
  url:         'https://www.pilship.com/digital-solutions/?tab=customer&id=track-trace&label=containerTandT&module=TrackTraceBL',
  urlTemplate: 'https://www.pilship.com/digital-solutions/?tab=customer&id=track-trace&label=containerTandT&module=TrackTraceBL&refNo={bookingNo}',
  // The search type is the URL "module" param (= the custom dropdown's data-value):
  // TrackContStatus = Container Number, TrackTraceBL = B/L Number. Use the right one
  // per type instead of automating the dropdown.
  urlTemplateByType: {
    container: 'https://www.pilship.com/digital-solutions/?tab=customer&id=track-trace&label=containerTandT&module=TrackContStatus&refNo={bookingNo}',
    bl:        'https://www.pilship.com/digital-solutions/?tab=customer&id=track-trace&label=containerTandT&module=TrackTraceBL&refNo={bookingNo}'
  },
  inputSelectors:  [],
  submitSelectors: [],
  submitMethod:    'none',
  // PIL shows results from the URL (no form). We inject only to dismiss its Cookiebot
  // consent dialog — "Allow all" (with "Deny" as a fallback). The engine's consent path
  // polls for it, since Cookiebot loads asynchronously.
  consentSelectors: [
    '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll',
    '#CybotCookiebotDialogBodyButtonDecline'
  ],

  scrape() {
    // TODO: extract tracking results from PIL page
  }
};

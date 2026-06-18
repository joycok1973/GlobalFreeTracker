// PIL (Pacific International Lines)
CARRIER_CONFIGS['PABV'] = {
  scac:        'PABV',
  prefixes:    ['PABV'],
  stripPrefix: true,   // PIL search uses the BL number without the PABV prefix
  hostname:    'www.pilship.com',
  url:         'https://www.pilship.com/digital-solutions/?tab=customer&id=track-trace&label=containerTandT&module=TrackTraceBL',
  urlTemplate: 'https://www.pilship.com/digital-solutions/?tab=customer&id=track-trace&label=containerTandT&module=TrackTraceBL&refNo={bookingNo}',
  inputSelectors:  [],
  submitSelectors: [],
  submitMethod:    'none',

  scrape() {
    // TODO: extract tracking results from PIL page
  }
};

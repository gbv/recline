(function ($) {
module("Backend Local Beacon");

function parseBeaconTest(s,records,metadata,options) {
  return function() {
    var beacon = recline.Backend.Beacon.parseBeacon(s,options);
    var exp = {
      records: records,
      metadata: metadata
    };
    deepEqual(beacon, exp);
  };
};

test("parseBeacon", parseBeaconTest(
  '#FORMAT:  BEACON\n#FOO:  BAR\r\n#doZ: b  a\tz',
  [],
  { 
    format: "BEACON",
    foo: "BAR",
    doz: "b a z"
  }
));

test("parseBeacon", parseBeaconTest(
  '#FORMAT: BEACON\n\ra:bc\nf:oo|http://example.org/\nf:oo|doz|b:az',
  [['a:bc','','a:bc'],
   ['f:oo','','http://example.org/'],
   ['f:oo','doz','b:az']
  ],
  {
    format: "BEACON"
  }
));

})(this.jQuery);

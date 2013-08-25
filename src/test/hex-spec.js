var Hex = require('../../bin/hexmap.js');
var assert = require('assert');

describe('Hex.Hex', function(){
  it('should have a reference to its own map', function(){
    var map = new Hex.Map({
      rows: 5,
      cols: 5
    });

    var hex = map.hex(3, 3);
    
    
    assert.equal(hex.getMap(), map);
  });
})

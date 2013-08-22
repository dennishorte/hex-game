var Hex = require('./hexmap.js');
var assert = require('assert');

console.log( "Hex: " + Hex );

describe('Hex', function(){
  describe('.test()', function(){
    it('should return Hex.test', function(){
      console.log( Hex.test() );
      assert.equal('Hex.test', Hex.test());
    })
  })
})

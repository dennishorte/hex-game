var Hex = require('../../bin/hexmap.js');
var assert = require('assert');

describe('Hex.Map', function(){
    describe('without hex data', function(){
        it('should successfully create the object', function() {
            var map = new Hex.Map({
                rows: 5,
                cols: 5
            });
        });

        it('should have an array of hexes', function() {
            var map = new Hex.Map({
                rows: 5,
                cols: 5
            });

            assert(Object.prototype.toString.call(map.getHexes()) === '[object Array]')
        });

        it('should create new hexes', function(){
            var map = new Hex.Map({
                rows: 5,
                cols: 5
            });

            var hexes = map.getHexes();

            assert.equal(hexes.length, 5);
            assert.equal(hexes[0].length, 4);
            assert.equal(hexes[1].length, 5);
            assert.equal(hexes[2].length, 4);
            assert.equal(hexes[3].length, 5);
            assert.equal(hexes[4].length, 4);
        });

        it('should correctly retrieve hexes by their ids', function() {
            var map = new Hex.Map({
                rows: 5,
                cols: 5
            });

            var hexes = map.getHexes();

            for (row in hexes) {
                for (col in hexes[row]) {
                    var hex = hexes[row][col];
                    assert.equal(hex, map.hex(hex.getId()));
                };
            };
        });
    });

    describe('#flatHexes', function() {
        var flatFixture = function() {
            var map = new Hex.Map({
                rows: 5,
                cols: 5
            });

            var flat = map.flatHexes();

            return {
                map: map,
                flat: flat,
            };
        };

        it('should contain the correct number of hexes', function() {
            var f = flatFixture();
            assert.equal(f.flat.length, 22);
        });

        // it('should have each of the hexes exacty once', function() {
        //   var f = flatFixture();
        //   var ids = f.flat.map(function(elem) {
        //     elem.getId();
        //   });
        // });
    });
});

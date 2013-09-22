var Hex = require('../../bin/hexmap.js');
var assert = require('assert');

describe('Hex.Map', function(){
    describe('on creation', function() {
        it('should have zero rows and zero columns', function() {
            var map = new Hex.Map();
            assert.equal(map.getRows(), 0);
            assert.equal(map.getCols(), 0);
        });
    });

    describe('when adding new hexes', function() {
        describe('first hex', function() {
            var map = new Hex.Map();
            var row = 23;
            var col = -77;
            var hex = new Hex.Hex(row, col);
            map.updateHex(hex);

            it('should update the number of rows and columns', function() {
                assert.equal(map.getRows(), 1);
                assert.equal(map.getCols(), 1);
            });

            it('should be retrievable by position', function() {
                assert.ok(map.getHex(23, -77) === hex);
            });

            it('should give the hex a reference to the map', function() {
                assert.ok(hex.getMap() === map);
            });
        });

        describe('second hex', function() {
            var map = new Hex.Map();
            var hex1 = new Hex.Hex(2, 5);
            var hex2 = new Hex.Hex(3, 0);

            map.updateHex(hex1);
            map.updateHex(hex2);

            it('should update the number of rows and columns', function() {
                assert.equal(map.getRows(), 2);
                assert.equal(map.getCols(), 6);
            });

            it('should be retrievable by position', function() {
                assert.ok(map.getHex(2, 5) === hex1);
                assert.ok(map.getHex(3, 0) === hex2);
            });

            it('should give the hex a reference to the map', function() {
                assert.ok(hex1.getMap() === map);
                assert.ok(hex2.getMap() === map);
            });
        });
    });
});

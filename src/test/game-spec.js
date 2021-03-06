var Hex = require('../../bin/hexmap.js');
var assert = require('assert');

describe('Hex.Game', function () {
    describe('on creation', function () {
        it('should have a map', function() {
            var game = new Hex.Game();
            assert.ok(typeof game.getMap() !== 'undefined');
            assert.ok(typeof game.getMap().attrs !== 'undefined');
            assert.ok(typeof game.getMap().attrs.hexCount !== 'undefined');
        });

        it('should have no players', function () {
            var game = new Hex.Game();
            assert.ok(game.getPlayers().length == 0);
        });
    });

    describe('after adding players', function() {
        var game = new Hex.Game();
        var player1 = new Hex.Player();
        var player2 = new Hex.Player();
        var player3 = new Hex.Player();
        game.addPlayer(player1);
        game.addPlayer(player2);
        game.addPlayer(player3);

        it('should have those players, in order', function() {
            assert.ok(game.getPlayers().length === 3);
            assert.ok(game.getPlayers()[0] === player1);
            assert.ok(game.getPlayers()[1] === player2);
            assert.ok(game.getPlayers()[2] === player3);
        });
    });

    describe('after initializing the map', function() {
        var game = new Hex.Game();
        var player1 = new Hex.Player();
        game.addPlayer(player1);
        Hex.Util.genMap(5, 5, game.getMap());

        it('the map should have lots of information', function() {
            var map = game.getMap();
            assert.equal(map.getRows(), 5);
            assert.equal(map.getCols(), 5);
            assert.equal(map.hexCount(), 22);
        });

        it('players should not have any map information', function() {
            assert.equal(game.getPlayers()[0].getMap().getRows(), 0);
        });
    });

    describe('when a player explores something', function() {
        var game = new Hex.Game();
        var player1 = new Hex.Player();
        var player2 = new Hex.Player();
        var player3 = new Hex.Player();
        game.addPlayer(player1);
        game.addPlayer(player2);
        game.addPlayer(player3);
        Hex.Util.genMap(5, 5, game.getMap());

        var hex = game.getMap().getHex(2,3);
        game.exploreHex(player2, hex);
        
        it('should be added to that player\'s map', function () {
            assert.equal(player2.getMap().hexCount(), 1);
            assert.ok(player2.getMap().getHex(2,3) === hex);
        });

        it('should become visible to that player', function () {
            assert.ok(player2.visible(hex));
        });

        it('should not be added to other player\'s maps', function () {
            assert.equal(player1.getMap().hexCount(), 0);
            assert.equal(player3.getMap().hexCount(), 0);
            assert.strictEqual(typeof player1.getMap().getHex(2,3), 'undefined');
            assert.strictEqual(typeof player3.getMap().getHex(2,3), 'undefined');
        });

        it('should not be visible to other players', function () {
            assert.ok(!player1.visible(hex));
            assert.ok(!player3.visible(hex));
        });
    });
});

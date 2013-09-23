
Hex.Game = function () {
    this.attrs = {
        map: new Hex.Map(),
        players: []
    };
};

Hex.Util.addGetters(Hex.Game, 'map', 'players');

Hex.Game.prototype.addPlayer = function (player) {
    player.setGame(this);
    player.setId(this.attrs.players.length);
    this.attrs.players.push(player);
};

/*
 * Explore updates a player's information about a particular hex, and gives them
 * visibility to that hex until visibility is reset.
 */
Hex.Game.prototype.exploreHex = function (player, hex) {
    player.addVisible(hex.repr());
};

/*
 * Resets the visibility for all player.
 */
Hex.Game.prototype.resetVisibility = function () {
    _.forEach(this.getPlayers(), function(player) {
        player.clearVisible();
    });
};



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



Hex.Player = function () {
    this.attrs = {
        game: null,
        id: null,
        map: new Hex.Map()
    };
};

Hex.Util.addGetters(Hex.Player, 'game', 'id', 'map');
Hex.Util.addSafeSetters(Hex.Player, 'game', 'id');

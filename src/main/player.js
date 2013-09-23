
Hex.Player = function () {
    this.attrs = {
        game: null,
        id: null,
        map: new Hex.Map(),
        visible: {}
    };
};

Hex.Util.addGetters(Hex.Player, 'game', 'id', 'map');
Hex.Util.addSafeSetters(Hex.Player, 'game', 'id');

Hex.Player.prototype.addVisible = function (hexRepr) {
    var hex = Hex.Hex.construct(hexRepr);
    this.getMap().updateHex(hex);
    this.attrs.visible[hex.posString()] = true;
};

Hex.Player.prototype.clearVisible = function () {
    this.attrs.visible = {};
};

Hex.Player.prototype.visible = function (hex) {
    if (typeof hex === 'string') {
        return hex in this.attrs.visible;
    }
    else {
        return hex.posString() in this.attrs.visible;
    }
};

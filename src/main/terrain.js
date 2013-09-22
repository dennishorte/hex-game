

Hex.Terrain = function (config) {
    this.attrs = {
        height: config.height,
        climate: config.climate,
        veg: config.veg,
        hex: null
    };
};

Hex.Util.addGetters(Hex.Terrain, 'height', 'climate', 'veg', 'hex');
Hex.Util.addSetters(Hex.Terrain, 'hex');

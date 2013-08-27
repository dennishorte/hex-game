
Hex.Hex = function(config) {
    this._initHex(config);
};

Hex.Hex.prototype._initHex = function(config) {
    this.attrs = {
        id: config.id,
        row: config.row,
        col: config.col,
        diag: config.col + Math.floor( config.row / 2 ),
        map: config.map,
        elements: []
    };

};

Hex.Hex.prototype.getId = function() { return this.attrs.id; };
Hex.Hex.prototype.getRow = function() { return this.attrs.row; };
Hex.Hex.prototype.getCol = function() { return this.attrs.col; };
Hex.Hex.prototype.getDiag = function() { return this.attrs.diag; };
Hex.Hex.prototype.getMap = function() { return this.attrs.map; };
Hex.Hex.prototype.getElements = function() { return this.attrs.elements.slice(0); };

Hex.Hex.prototype.addElement = function(elem, path) {
    console.assert(elem.getHex() == this, 'Cannot add an element unless it is on this hex.');

    this.attrs.elements.push(elem);
    this.attrs.elements.sort(function(a, b) {
        return a.getZ() - b.getZ();
    });
};


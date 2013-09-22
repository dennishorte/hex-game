
/*
 * A hex can contain many objects. To store them it has a number of pre-defined slots which
 * objects can be inserted into.
 */

Hex.Hex = function(row, col) {
    this.attrs = {
        row: row,
        col: col,
        diag: col + Math.floor( row / 2 ),
        map: null,
        slots: {
            terrain: null,
            resource: null,
            building: null,
            unit: null,
        }
    };
};

Hex.Util.addGetters(Hex.Hex, 'row', 'col', 'diag', 'map');
Hex.Util.addSafeSetters(Hex.Hex, 'map');

Hex.Hex.prototype.posString = function() { return Hex.Util.posString(this.getRow(), this.getCol()); };

Hex.Hex.prototype.setSlot = function (name, value) {
    if (name in this.attrs.slots) {
        this.attrs.slots[name] = value;
        value.setHex(this);
    }
    else {
        throw new Error('Unknown slot: ' + name);
    }
};

Hex.Hex.prototype.getSlot = function (name) {
    return this.attrs.slots[name];
};
Hex.Hex.prototype.getTerrain = function () {
    return this.attrs.slots.terrain;
};

Hex.Hex.prototype.setUnit = function (unit) {
    if (unit.getHex() === this) return;
    
    if (unit.getHex() != null) {
        unit.getHex().clearUnit();
    }
    this.setSlot('unit', unit);
    return this;
};

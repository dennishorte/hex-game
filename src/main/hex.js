
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

Hex.Hex.construct = function (repr) {
    var hex = new Hex.Hex(repr.row, repr.col);
    _.forEach(repr.slots, function(slotRepr, key) {
        var value = null;
        switch(key) {
        case 'terrain':
            value = Hex.Terrain.construct(slotRepr);
            break;
        case 'resource':
            value = Hex.Resource.construct(slotRepr);
            break;
        case 'building':
            value = Hex.Building.construct(slotRepr);
            break;
        case 'unit':
            value = Hex.Unit.construct(slotRepr);
            break;
        default:
            throw new Error('Unknown slot: ' + key);
        }
        hex.setSlot(key, value);
    });
    return hex;
};

/*
 * Return a dictionary that can be used to reconstruct the details of this hex
 * using the Hex.Construct method.
 */
Hex.Hex.prototype.repr = function() {

    var slotReprs = _.map(this.slots, function (value, key) {
        if (key == null) return null;
        else return value.repr();
    });

    var repr = {
        row: this.row,
        col: this.col,
        slots: slotReprs
    };

    return repr;
}

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

Hex.Hex.prototype.setTerrain = function (terrain) {
    this.setSlot('terrain', terrain);
};

Hex.Hex.prototype.setUnit = function (unit) {
    if (unit.getHex() === this) return;
    
    if (unit.getHex() != null) {
        unit.getHex().clearUnit();
    }
    this.setSlot('unit', unit);
    return this;
};

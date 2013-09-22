
Hex.Util = {};

Hex.Util.posString = function (row, col) {
    return '' + row + ',' + col;
};

Hex.Util.setHex = function (hex) {
    this.attrs.hex = hex;
};

Hex.Util.addFunc = function (constructor, name, func) {
    if (constructor.prototype[name] === undefined) {
        constructor.prototype[name] = func;
    }
    else {
        throw new Error('Can\'t add func ' + name + '. Already defined.');
    }
};

Hex.Util.addGetter = function (constructor, attr) {
    var name = 'get' + attr.charAt(0).toUpperCase() + attr.slice(1);
    var func = function () {
        return this.attrs[attr];
    };
    Hex.Util.addFunc(constructor, name, func);
};

Hex.Util.addGetters = function(constructor) {
    var attrs = Array.prototype.slice.call(arguments, 1);
    for (var n = 0; n < attrs.length; n++) {
        var attr = attrs[n];
        Hex.Util.addGetter(constructor, attr);
    }
};

Hex.Util.addSetter = function(constructor, attr) {
    var name = 'set' + attr.charAt(0).toUpperCase() + attr.slice(1);
    var func = function (arg) {
        if (arg === undefined) {
            throw new Error('Can\'t set value of ' + attr + ' to undefined.');
        }
        else {
            this.attrs[attr] = arg;
        }
    };
    Hex.Util.addFunc(constructor, name, func);
};

Hex.Util.addSetters = function(constructor) {
    var attrs = Array.prototype.slice.call(arguments, 1);
    for(var n = 0; n < attrs.length; n++) {
        var attr = attrs[n];
        Hex.Util.addSetter(constructor, attr);
    }
};

/*
 * A safe setter can only be set once. After its value has become non-undefined and non-null,
 * attempting to change it will raise an error.
 */
Hex.Util.addSafeSetter = function (constructor, attr) {
    var name = 'set' + attr.charAt(0).toUpperCase() + attr.slice(1);
    var func = function (arg) {
        if (typeof arg === 'undefined' || arg === null) {
            throw new Error('Can\'t set value of ' + attr + ' to ' + arg);
        }
        else if (typeof this.attrs[attr] === 'undefined' || this.attrs[attr] === null) {
            this.attrs[attr] = arg;
        }
        else {
            throw new Error('Can\'t change value of ' + attr + ' after it has been set.');
        }
    };
    Hex.Util.addFunc(constructor, name, func);
};

Hex.Util.addSafeSetters = function(constructor) {
    var attrs = Array.prototype.slice.call(arguments, 1);
    for(var n = 0; n < attrs.length; n++) {
        var attr = attrs[n];
        Hex.Util.addSafeSetter(constructor, attr);
    }
};


Hex.Util.genMap = function (rows, cols, map) {

    // Initialize the map hexes.
    for (var rowCount = 0; rowCount < rows; rowCount++) {

        // Alternate the length of the rows to make a nicely shaped map.
        // This is important to avoid hanging corners. If this is not done then two of the
        // corners will have a hex that only has two neighbors, rather than three.
        // Note, this only helps if the total number of rows is odd. If it is even, it will result
        // in both of the bottom corners suffering from the two neighbor problem.
        var numCols = cols;
        if (rowCount % 2 == 0) numCols -= 1

        for (var colCount = 0; colCount < numCols; colCount++) {
            var hex = new Hex.Hex(rowCount, colCount);
            var terrain = Hex.Util.randomTerrain();
            hex.setTerrain(terrain);
            map.updateHex(hex);
        }
    }
};

Hex.Util.randomTerrain = function () {
    return new Hex.Terrain({
        height: 'flat',
        climate: 'temperate',
        veg: 'none'
    });
};


var unique_id_holder = 0;
Hex.Util.getUniqueId = function() {
    unique_id_holder += 1;
    return unique_id_holder;
};

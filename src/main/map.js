
Hex.Map = function(config) {
    this._initMap(config);
}

/**
 * Required config parameters:
 *   rows {Int} number of rows in the map; should be an odd number to get a nicely formatted map
 *   cols {Int] number of columns in the wider columns of the map
 *
 * Optional config parameters:
 *   hexes {2d array of dicts} config files for initializing the map hexes
 */
Hex.Map.prototype._initMap = function(config) {
    if( config.rows < 1 ) throw "Invalid number of rows in Hex.Map: " + config.rows;
    if( config.cols < 1 ) throw "Invalid number of columns in Hex.Map: " + config.cols;

    this.attrs = {
        rows: config.rows,
        cols: config.cols,
        hexes: [],
        idToHex: {},
        nextId: config.nextId || 0,
    };

    // Initialize the map hexes.
    var rowCount = 0;
    var colCount = 0;
    var numCols = config.cols;
    while (rowCount < config.rows) {
        var hexRow = [];

        // Alternate the length of the rows to make a nicely shaped map.
        // This is important to avoid hanging corners. If this is not done then two of the
        // corners will have a hex that only has two neighbors, rather than three.
        // Note, this only help if the total number of rows is odd. If it is even, it will result
        // in both of the bottom corners suffering from the two neighbor problem.
        if (rowCount % 2 == 0) numCols -= 1
        else numCols += 1

        while (colCount < numCols) {
            // There is existing hex data for this map. Initialize it.
            if (typeof hexes !== 'undefined') {
                var config = hexes[rowCount][colCount]
                config.map = this;
                hexRow.push(new Hex.Hex(config));
            }

            // This is a new map. Create new, empty hexes for it.
            else {
                var hexId = this._genId();
                var hex = new Hex.Hex({
                    map: this,
                    id: hexId,
                    row: rowCount,
                    col: colCount
                });
                hexRow.push(hex);
                this.attrs.idToHex[hexId] = hex;
            }

            colCount += 1;
        }

        this.attrs.hexes.push(hexRow);
        rowCount += 1;
        colCount = 0;
    }
};

Hex.Map.prototype._genId = function() {
    this.attrs.nextId += 1;
    return this.attrs.nextId;
};

Hex.Map.prototype.getRows = function() { return this.attrs.rows; };
Hex.Map.prototype.getCols = function() { return this.attrs.cols; };
Hex.Map.prototype.getHexes = function() { return this.attrs.hexes.slice(0); };
Hex.Map.prototype.hex = function(row, col) { return this.attrs.hexes[row][col]; };
Hex.Map.prototype.hex = function(id) { return this.attrs.idToHex[id]; };

/**
 * returns {Array[Hex]} A single array with all hexes ordered from top to bottom, left to right.
 */
Hex.Map.prototype.flatHexes = function() {
    return [].concat.apply([], this.getHexes());
};

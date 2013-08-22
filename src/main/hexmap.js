
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
  this.attrs = {
    rows: config.rows,
    cols: config.cols,
    hexes: [],
    id_to_hex: {},
  };

  // Initialize the map hexes.
  var rowCount = 0;
  var colCount = 0;
  var numCols = map.cols;
  while (rowCount < map.rows) {
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
        hexRow.push(new Hex.Hex(hexes[rowCount][colCount]);
      }

      // Create new, empty hexes for this map.
      else {
        hexRow.push(
          new Hex.Hex({
            rows: rowCount,
            cols: colCount
          })
        );
      }

      colCount += 1;
    }

    map.hexes.push(hexRow);
    rowCount += 1;
    colCount = 0;
  }
};

Hex.Map.prototype.getRows = function() { return this.attrs.rows; };
Hex.Map.prototype.getCols = function() { return this.attrs.cols; };
Hex.Map.prototype.getHexes = function() { return this.attrs.hexes; };
Hex.Map.prototype.getHex = function(row, col) { return this.attrs.hexes[row][col]; };
Hex.Map.prototype.getHex = function(id) { return this.attrs.id_to_hex[id]; };

Hex.test = function() {
  return 'Hex.test';
};


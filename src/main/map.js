
/*
 * The map is intended to be a data structure for operating on hexes, but does nothing to specify
 * hexes on its own. Fundamentally, it understands that the hexes exist in a grid, and uses this
 * knowledge, but otherwise it makes no assumptions about the hexes.
 *
 * Hexes specify a row and column, which is essential for rendering them correctly, but that row
 * and column can not, in general, be used to extract any information beyond the relative positions
 * of the hex. To make this work, hex information is stored in a map rather than in an array.
 *
 * A map is never serialized, because all of its information is carried in its hexes.
 */

Hex.Map = function () {
    this.attrs = {
        min_row: 0,
        max_row: -1,
        min_col: 0,
        max_col: -1,
        hexes: {},
        hexCount: 0
    };
};

/*
 * Hex.Map.prototype.getRows
 * @return {Int} the number of rows in the map
 */
Hex.Map.prototype.getRows = function () {
    if (this.hexCount() == 0) {
        return 0;
    }
    else if (this.hexCount() == 1) {
        return 1;
    }
    else {
        return this.attrs.max_row - this.attrs.min_row + 1;
    }
};

/*
 * Hex.Map.prototype.getCols
 * @return {Int} the number of columns in the map
 */
Hex.Map.prototype.getCols = function () {
    if (this.hexCount() == 0) {
        return 0;
    }
    else if (this.hexCount() == 1) {
        return 1;
    }
    else {
        return this.attrs.max_col - this.attrs.min_col + 1;
    }
};

Hex.Map.prototype.getHex = function (row, col) {
    var string = Hex.Util.posString(row, col);
    return this.attrs.hexes[string];
};

Hex.Map.prototype.hexCount = function () {
    return this.attrs.hexCount;
};

/*
 * Hex.Map.prototype.updateHex
 * 
 * If a new hex is added that is updating information for an existing hex, then the new hex should
 * have the same position and id as the previous hex. If not, an error will be thrown.
 *
 * @param hex {Hex.Hex} the hex object to insert into the map
 */
Hex.Map.prototype.updateHex = function (hex) {

    // Update our known map size.
    if (this.hexCount() === 0) {
        this.attrs.min_row = hex.getRow();
        this.attrs.max_row = hex.getRow();
        this.attrs.min_col = hex.getCol();
        this.attrs.max_col = hex.getCol();
    }
    else {
        if (hex.getRow() < this.attrs.min_row) {
            this.attrs.min_row = hex.getRow();
        }
        if (hex.getRow() > this.attrs.max_row) {
            this.attrs.max_row = hex.getRow();
        }
        if (hex.getCol() < this.attrs.min_col) {
            this.attrs.min_col = hex.getCol();
        }
        if (hex.getCol() > this.attrs.max_col) {
            this.attrs.max_col = hex.getCol();
        }
    }

    // If this is a new hex, increment the number of hexes in the map.
    if (!(hex.posString() in this.attrs.hexes)) {
        this.attrs.hexCount += 1;
    }

    hex.setMap(this);
    this.attrs.hexes[hex.posString()] = hex;
};



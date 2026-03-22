class Board {
  /** @private {number} */
  _rows;
  /** @private {number} */
  _cols;
  /** @private {?Tile[][]} */
  _tiles;
  /** @private {?Shape} */
  _shape;

  /**
   * @param {number} rows
   * @param {number} cols
   */
  constructor(rows, cols) {
    this._rows = rows;
    this._cols = cols;
    this._tiles = [];
    this._shape = null;

    for (let i = 0; i < rows; i++) {
      this._tiles.push(Array(this._cols).fill(null, 0, this._cols));
    }
  }

  getRows() {
    return this._rows;
  }

  getCols() {
    return this._cols;
  }

  getTiles() {
    return this._tiles;
  }

  /**
   * @param {number} row
   * @param {number} col
   * @returns {?Tile}
   */
  getTileAt(row, col) {
    return this._tiles[row][col];
  }

  getShape() {
    return this._shape;
  }

  /**
   * @param {?Shape} shape
   */
  setShape(shape) {
    this._shape = shape;
  }

  shapeCanMoveTo(rows, cols) {
    if (this._shape === null) return false;

    const cells = this._shape.getTransformedCellsFor(
        this._shape.getRow() + rows,
        this._shape.getCol() + cols,
    );

    for (const cell of cells) {
      if (cell.row < 0 || cell.row >= this._rows) return false;
      if (cell.col < 0 || cell.col >= this._cols) return false;
      if (this._tiles[cell.row][cell.col] !== null) return false;
    }

    return true;
  }

  explodeShape() {
    if (this._shape === null) return;

    for (const cell of this._shape.getTransformedCells()) {
      this._tiles[cell.row][cell.col] = Tile.randomColored();
    }

    this._shape = null;
  }

  isOver() {
    return false;
  }

  clean() {
    for (let i = 0; i < this._rows; i++) {
      let full = true;

      for (let j = 0; j < this._cols; j++) {
        if (this._tiles[i][j] === null) {
          full = false;
        }
      }

      if (!full) continue;

      for (let j = 0; j < this._cols; j++) {
        this._tiles[i][j] = null;
      }
    }

    this.#compress();
  }

  addTile(row, col) {
    this._tiles[row][col] = Tile.randomColored();
  }

  #compress() {
    for (let i = 0; i < this._rows; i++) {
      let empty = true;

      for (let j = 0; j < this._cols; j++) {
        if (this._tiles[i][j] !== null) {
          empty = false;
        }
      }

      if (!empty) continue;

      this._tiles.unshift(new Array(this._cols).fill(null, 0, this._cols));
      this._tiles.splice(i + 1, 1);
    }
  }
}

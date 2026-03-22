class Shape {
  /** @private {number} */
  _row;
  /** @private {number} */
  _col;
  /** @private {number} */
  _variant;
  /** @private {{row: number, col: number}[][]} */
  _variants;

  /**
   * @param {number} row
   * @param {number} col
   * @param {{row: number, col: number}[][]} variants
   */
  constructor(row, col, variants) {
    this._row = row;
    this._col = col;
    this._variants = variants;
    this._variant = Math.floor(Math.random() * this._variants.length);
  }

  getRow() {
    return this._row;
  }

  getCol() {
    return this._col;
  }

  move(rows, cols) {
    this._row += rows;
    this._col += cols;
  }

  getCells() {
    return this._variants[this._variant];
  }

  /**
   * @returns {{row: number, col: number}[]}
   */
  getTransformedCells() {
    return this.getTransformedCellsFor(this._row, this._col);
  }

  /**
   * @param {number} row
   * @param {number} col
   * @returns {{row: number, col: number}[]}
   */
  getTransformedCellsFor(row, col) {
    const cells = [];

    for (const cell of this._variants[this._variant]) {
      cells.push({
        row: row + cell.row,
        col: col + cell.col,
      });
    }

    return cells;
  }

  decent() {
    this.move(1, 0);
  }

  nextVariant() {
    this._variant++;
    this._variant %= this._variants.length;
  }
}

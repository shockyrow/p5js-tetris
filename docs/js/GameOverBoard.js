class GameOverBoard {
  /** @private {Board} */
  _board;

  constructor(board) {
    this._board = board;
  }

  getRows() {
    return this._board.getRows();
  }

  getCols() {
    return this._board.getCols();
  }

  getTiles() {
    return this._board.getTiles();
  }

  /**
   * @param {number} row
   * @param {number} col
   * @returns {?Tile}
   */
  getTileAt(row, col) {
    return this._board.getTileAt(row, col);
  }

  getShape() {
    return null;
  }

  /**
   * @param {?Shape} shape
   */
  setShape(shape) {
  }

  shapeCanMoveTo(rows, cols) {
    return false;
  }

  explodeShape() {
  }

  isOver() {
    return true;
  }

  clean() {
  }

  addTile(row, col) {
  }
}

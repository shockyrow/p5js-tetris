class Artist {
  /** @private {?Board} */
  _board = null;
  _canvasWidth = 1;
  _canvasHeight = 1;
  _canvasMargin = 32;
  _canvasPadding = 8;
  _tileGap = 4;

  /**
   * @param {?Board} board
   */
  setBoard(board) {
    this._board = board;
  }

  updateCanvas() {
    if (this._board === null) return;

    let scale = Math.min(windowWidth, windowHeight);
    let width = this._board.getCols() * scale;
    let height = this._board.getRows() * scale;
    let maxWidth = Math.min(windowWidth - this._canvasMargin * 2, 640);
    let maxHeight = Math.min(windowHeight - this._canvasMargin * 2, 640);

    if (width > maxWidth) {
      let change = maxWidth / width;

      width = maxWidth;
      height *= change;
    }

    if (height > maxHeight) {
      let change = maxHeight / height;

      width *= change;
      height = maxHeight;
    }

    this._canvasWidth = width + this._canvasPadding * 2;
    this._canvasHeight = height + this._canvasPadding * 2;

    resizeCanvas(this._canvasWidth, this._canvasHeight);
  }

  draw() {
    if (this._board === null) return;

    push();
    stroke(16);
    fill(72);

    for (let y = 0; y < this._board.getRows(); y++) {
      for (let x = 0; x < this._board.getCols(); x++) {
        let tile = this._board.getTileAt(y, x);

        if (tile !== null) {
          this.#drawTile(y, x, tile);
        }
      }
    }

    const shape = this._board.getShape();

    if (shape !== null) {
      for (const cell of shape.getTransformedCells()) {
        this.#drawTile(cell.row, cell.col, new Tile('slateblue'));
      }
    }

    if (board.isOver()) {
      fill('crimson');
      textAlign(CENTER, CENTER);
      textSize(this._canvasWidth / 12);
      textStyle(BOLD);
      text('Game Over', this._canvasWidth / 2, this._canvasHeight / 2);
    }

    pop();
  }

  getPos(x, y) {
    let size = this.#getTileSize();

    return {
      'x': Math.floor((x - this._canvasPadding) / size),
      'y': Math.floor((y - this._canvasPadding) / size),
    };
  }

  #getTileSize() {
    return (this._canvasWidth - this._canvasPadding * 2) /
        this._board.getCols();
  }

  /**
   * @param {number} x
   * @param {number} y
   * @param {Tile} tile
   */
  #drawTile(row, col, tile) {
    let size = this.#getTileSize();
    let posX = this._canvasPadding + (col * size) + (this._tileGap / 2);
    let posY = this._canvasPadding + (row * size) + (this._tileGap / 2);

    fill(tile.getColor());
    rect(posX, posY, size - this._tileGap, size - this._tileGap, size / 8);
  }
}

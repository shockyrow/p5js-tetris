class Tile {
  /** @private {string|number} */
  _color;

  /**
   * @param {string|number} color
   */
  constructor(color) {
    this._color = color;
  }

  static randomColored() {
    // let colors = ['red', 'slateblue', 'lime', 'yellow'];
    let colors = [64];
    let color = colors[parseInt(Math.random() * colors.length)];

    return new this(color);
  }

  getColor() {
    return this._color;
  }

  /**
   * @param {string|number} color
   * @returns {Tile}
   */
  setColor(color) {
    this._color = color;
    return this;
  }
}

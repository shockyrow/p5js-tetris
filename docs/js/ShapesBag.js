class ShapesBag {
  static _variants = [
    // region Line
    [
      // region Horizontal
      [
        {row: 0, col: 0},
        {row: 0, col: 1},
        {row: 0, col: 2},
        {row: 0, col: 3},
      ],
      // endregion
      // region Vertical
      [
        {row: 0, col: 0},
        {row: 1, col: 0},
        {row: 2, col: 0},
        {row: 3, col: 0},
      ],
      // endregion
    ],
    // endregion
    // region Square
    [
      // region 2x2
      [
        {row: 0, col: 0},
        {row: 0, col: 1},
        {row: 1, col: 0},
        {row: 1, col: 1},
      ],
      // endregion
    ],
    // endregion
    // region L
    [
      // region Normal
      [
        {row: 0, col: 0},
        {row: 1, col: 0},
        {row: 2, col: 0},
        {row: 2, col: 1},
      ],
      // endregion
      // region Rotated 90
      [
        {row: 0, col: 0},
        {row: 0, col: 1},
        {row: 0, col: 2},
        {row: 1, col: 0},
      ],
      // endregion
      // region Rotated 180
      [
        {row: 0, col: 0},
        {row: 0, col: 1},
        {row: 1, col: 1},
        {row: 2, col: 1},
      ],
      // endregion
      // region Rotated 270
      [
        {row: 0, col: 2},
        {row: 1, col: 0},
        {row: 1, col: 1},
        {row: 1, col: 2},
      ],
      // endregion
    ],
    // endregion
    // region Flipped L
    [
      // region Normal
      [
        {row: 0, col: 1},
        {row: 1, col: 1},
        {row: 2, col: 1},
        {row: 2, col: 0},
      ],
      // endregion
      // region Rotated 90
      [
        {row: 0, col: 0},
        {row: 1, col: 0},
        {row: 1, col: 1},
        {row: 1, col: 2},
      ],
      // endregion
      // region Rotated 180
      [
        {row: 0, col: 0},
        {row: 0, col: 1},
        {row: 1, col: 0},
        {row: 2, col: 0},
      ],
      // endregion
      // region Rotated 270
      [
        {row: 0, col: 0},
        {row: 0, col: 1},
        {row: 0, col: 2},
        {row: 1, col: 2},
      ],
      // endregion
    ],
    // endregion
    // region Triangle
    [
      // region Normal
      [
        {row: 0, col: 0},
        {row: 1, col: 0},
        {row: 1, col: 1},
        {row: 2, col: 0},
      ],
      // endregion
      // region Rotated 90
      [
        {row: 0, col: 0},
        {row: 0, col: 1},
        {row: 0, col: 2},
        {row: 1, col: 1},
      ],
      // endregion
      // region Rotated 180
      [
        {row: 0, col: 1},
        {row: 1, col: 0},
        {row: 1, col: 1},
        {row: 2, col: 1},
      ],
      // endregion
      // region Rotated 270
      [
        {row: 1, col: 0},
        {row: 0, col: 1},
        {row: 1, col: 1},
        {row: 1, col: 2},
      ],
      // endregion
    ],
    // endregion
    // region Thunder
    [
      // region Normal
      [
        {row: 0, col: 0},
        {row: 1, col: 0},
        {row: 1, col: 1},
        {row: 2, col: 1},
      ],
      // endregion
      // region Rotated
      [
        {row: 0, col: 1},
        {row: 0, col: 2},
        {row: 1, col: 0},
        {row: 1, col: 1},
      ],
      // endregion
    ],
    // endregion
    // region Flipped thunder
    [
      // region Normal
      [
        {row: 0, col: 1},
        {row: 1, col: 0},
        {row: 1, col: 1},
        {row: 2, col: 0},
      ],
      // endregion
      // region Rotated
      [
        {row: 0, col: 0},
        {row: 0, col: 1},
        {row: 1, col: 1},
        {row: 1, col: 2},
      ],
      // endregion
    ],
    // endregion
  ];

  /** @private {Shape[]} */
  _shapes;

  /**
   * @param {Shape[]} shapes
   */
  constructor(shapes) {
    this._shapes = shapes;
  }

  static random() {
    return new this([]).reset();
  }

  reset() {
    const shapes = [];

    for (const rotations of ShapesBag._variants) {
      // const rotation = rotations[Math.floor(Math.random() * rotations.length)];
      shapes.push(new Shape(0, 0, rotations));
    }

    this._shapes = shapes;
    this.shuffle();
    return this;
  }

  shuffle() {
    for (let i = this._shapes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this._shapes[i], this._shapes[j]] = [this._shapes[j], this._shapes[i]];
    }
  }

  nextShape() {
    if (this._shapes.length === 0) {
      this.reset();
    }

    return this._shapes.shift();
  }
}

const DEBUG_MODE = false;
const BOARD_ROWS = 16;
const BOARD_COLS = 10;

let shapesBag = null;
let board = null;
let artist = null;

function setup() {
  shapesBag = ShapesBag.random();
  board = new Board(BOARD_ROWS, BOARD_COLS);
  artist = new Artist();
  artist.setBoard(board);

  createCanvas();
  artist.updateCanvas();
}

function draw() {
  background(24);

  board.clean();

  if (!board.isOver() && board.getShape() === null) {
    const shape = shapesBag.nextShape();
    shape.move(0, Math.floor(board.getCols() / 2));
    board.setShape(shape);

    if (board.shapeCanMoveTo(0, 0)) {
      let interval = setInterval(() => {
        if (!board.shapeCanMoveTo(1, 0)) {
          board.explodeShape();
          clearInterval(interval);
          return;
        }

        board.getShape().decent();
      }, 500);
    } else {
      board = new GameOverBoard(board);
    }
  }

  artist.setBoard(board);
  artist.draw();
}

function windowResized() {
  artist.updateCanvas();
}

function mouseClicked() {
  if (!DEBUG_MODE) return;

  const {x, y} = artist.getPos(mouseX, mouseY);
  board.addTile(y, x);
}

function keyPressed() {
  if (board.isOver()) {
    if (keyCode === 32) {
      board = new Board(BOARD_ROWS, BOARD_COLS);
    }

    return;
  }

  const shape = board.getShape();

  if (shape !== null) {
    if (keyCode === UP_ARROW) {
      shape.nextVariant();
    } else if (keyCode === DOWN_ARROW && board.shapeCanMoveTo(1, 0)) {
      shape.move(1, 0);
    } else if (keyCode === RIGHT_ARROW && board.shapeCanMoveTo(0, 1)) {
      shape.move(0, 1);
    } else if (keyCode === LEFT_ARROW && board.shapeCanMoveTo(0, -1)) {
      shape.move(0, -1);
    } else if (keyCode === ENTER) {
      board.explodeShape();
    }
  }
}

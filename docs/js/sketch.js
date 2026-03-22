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

  var hammer = new Hammer(document.body, {
    preventDefault: true,
  });

  hammer.get('swipe').set({
    direction: Hammer.DIRECTION_ALL,
  });

  hammer.on('swipe', swiped);
}

function swiped(event) {
  let move = '';

  if (event.direction == 2) {
    move = 'left';
  } else if (event.direction == 4) {
    move = 'right';
  } else if (event.direction == 8) {
    move = 'up';
  } else if (event.direction == 16) {
    move = 'down';
  }

  if (move !== '') {
    makeMove(move);
  }
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

  const { x, y } = artist.getPos(mouseX, mouseY);
  board.addTile(y, x);
}

function keyPressed() {
  const keyCodeMoveMap = {
    [UP_ARROW]: 'up',
    [DOWN_ARROW]: 'down',
    [RIGHT_ARROW]: 'right',
    [LEFT_ARROW]: 'left',
    // [ENTER]: 'explode',
  };

  const move = keyCodeMoveMap[keyCode] ?? '';

  if (move !== '') {
    makeMove(move);
  }
}

function makeMove(move) {
  if (board.isOver()) {
    if (move === 'down') {
      board = new Board(BOARD_ROWS, BOARD_COLS);
    }

    return;
  }

  const shape = board.getShape();

  if (shape !== null) {
    if (move === 'up') {
      shape.nextVariant();
    } else if (move === 'down' && board.shapeCanMoveTo(1, 0)) {
      shape.move(1, 0);
    } else if (move === 'right' && board.shapeCanMoveTo(0, 1)) {
      shape.move(0, 1);
    } else if (move === 'left' && board.shapeCanMoveTo(0, -1)) {
      shape.move(0, -1);
    } else if (move === 'explode') {
      board.explodeShape();
    }
  }
}

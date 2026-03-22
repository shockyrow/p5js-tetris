const DEBUG_MODE = false;
const BOARD_ROWS = 16;
const BOARD_COLS = 10;

let shapesBag = null;
let board = null;
let artist = null;

let touchstartX = 0;
let touchendX = 0;
let touchstartY = 0;
let touchendY = 0;

function checkSwipe() {
  const threshold = 16;
  const diffX = touchendX - touchstartX;
  const diffY = touchendY - touchstartY;
  const vertical = Math.abs(diffX) < Math.abs(diffY);
  const select = Math.max(Math.abs(diffX), Math.abs(diffY)) < threshold;

  let move = '';

  if (select) {
    move = 'select';
  } else if (vertical) {
    if (diffY > 0) {
      move = 'down';
    } else {
      move = 'up';
    }
  } else {
    if (diffX > 0) {
      move = 'right';
    } else {
      move = 'left';
    }
  }

  makeMove(move);
}

document.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX;
  touchstartY = e.changedTouches[0].screenY;
  console.log('test');
});

document.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX;
  touchendY = e.changedTouches[0].screenY;
  checkSwipe();
});

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

  const { x, y } = artist.getPos(mouseX, mouseY);
  board.addTile(y, x);
}

function keyPressed() {
  const keyCodeMoveMap = {
    32: 'select',
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
    if (move === 'select') {
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

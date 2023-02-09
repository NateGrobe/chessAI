// globals
const board_div = $('#myBoard');
const game = new Chess();
let globalSum = 0;
let positionCount;

// game configs
let config = {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onMouseoutSquare: removeHighlight,
  onMouseoverSquare: onMouseoverSquare,
  onSnapEnd: onSnapEnd,
};
let board = Chessboard('myBoard', config);

function evaluateBoard(game, move, prevSum, color) {
  if (game.in_checkmate()) {
    // need to figure out how to determine winning color
    if (move.color === color) { 
      $("#win-text").text("Black Wins!");
      return 10 ** 10; // opponent in mate
    }
    $("#win-text").text("White Wins!");
    return -(10 ** 10); // player in mate
  }

  if (game.in_draw() || game.in_threefold_repetition() || game.in_stalemate()) {
    return 0;
  }

  if (game.in_check()) {
    if (move.color === color) { // opponent in check
      prevSum += 50;
    } else { // player in check
      prevSum -= 50;
    }
  }

  const from = [8 - parseInt(move.from[1]), move.from.charCodeAt(0) - 'a'.charCodeAt(0)];
  const to = [8 - parseInt(move.to[1]), move.to.charCodeAt(0) - 'a'.charCodeAt(0)];

  // begin using endgame king table
  if (prevSum < -1500 && move.piece === 'k') {
      move.piece = 'k_e';
  }

  if ('captured' in move) {
    if (move.color === color) { // opponent piece captured
      prevSum +=
        weights[move.captured] +
        aiTable[move.color][move.captured][to[0]][to[1]];
    } else { // player piece captured
      prevSum -=
        weights[move.captured] +
        playerTable[move.color][move.captured][to[0]][to[1]];
    }
  }

  if (move.flags.includes('p')) {
    move.promotion = 'q';

    if (move.color === color) { // player pawn promotion
      prevSum -= weights[move.piece] + indexPlayerTable(move, from);
      prevSum +=
        weights[move.promotion] +
        playerTable[move.color][move.promotion][to[0]][to[1]];
    } else { // opponent pawn promotion
      prevSum +=
        weights[move.piece] + 
        playerTable[move.color][move.piece][from[0]][from[1]];
      prevSum -=
        weights[move.promotion] +
        playerTable[move.color][move.promotion][to[0]][to[1]];
    }
  } else {
    // The moved piece still exists on the updated board, so we only need to update the position value
    if (move.color !== color) {
      prevSum += indexPlayerTable(move, from);
      prevSum -= indexPlayerTable(move, to);
    } else {
      prevSum -= indexPlayerTable(move, from);
      prevSum += indexPlayerTable(move, to);
    }
  }

  return prevSum;
}

function indexPlayerTable(move, loc) {
  return playerTable[move.color][move.piece][loc[0]][loc[1]];
}

// Determines best move
function getBestMove(game, color, currSum) {
  positionCount = 0;
  let depth = 1;

  let [bestMove, bestMoveValue] = minimaxAB(
    game,
    depth,
    Number.NEGATIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    true,
    currSum,
    color
  );

  return [bestMove, bestMoveValue];
}

function checkStatus() {
  if (!game.in_checkmate()) {
    return false;
  }
  return true;
}

function makeBestMove(color) {
  const move = getBestMove(game, color, globalSum)[0];
  globalSum = evaluateBoard(game, move, globalSum, 'b');
  game.move(move);
  board.position(game.fen());
  checkStatus();
}

// Resets the game
function reset() {
  game.reset();
  globalSum = 0;
  board.position(game.fen());
  $("#win-text").text("");
}

// reset button
$("#reset-btn").click(() => reset());

// available move highlighting
function highlightMoves(target) {
  const square = $('#myBoard .square-' + target);
  const bg_color = square.hasClass('black-3c85d') ? '#696969' : '#a9a9a9';
  square.css('background', bg_color);
}

function removeHighlight() {
  $('#myBoard .square-55d63').css('background', '');
}

function onDragStart(_, piece) {
  if (game.game_over()) return false;

  // or if it's not that side's turn
  if (
    (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
    (game.turn() === 'b' && piece.search(/^w/) !== -1)
  ) {
    return false;
  }

  return true;
}

function onDrop(source, target) {
  undo_stack = [];
  removeHighlight();

  // see if the move is legal
  // assume queen promotion for now
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q',
  });

  // move is not legal
  if (!move) return 'snapback';

  globalSum = evaluateBoard(game, move, globalSum, 'b');

  // Setting min duration of AI move
  if (!checkStatus()) {
    window.setTimeout(() => makeBestMove('b'), 250);
  }
}

// toggle this as an option
function onMouseoverSquare(square) {
  // get list of possible moves for this square
  let moves = game.moves({
    square: square,
    verbose: true,
  });

  // exit if there are no moves available for this square
  if (moves.length === 0) return;

  // highlight the square they moused over
  highlightMoves(square);

  // highlight the possible squares for this piece
  for (let i = 0; i < moves.length; i++) {
    highlightMoves(moves[i].to);
  }
}

function onSnapEnd() {
  board.position(game.fen());
}
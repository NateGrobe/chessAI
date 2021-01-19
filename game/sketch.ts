let board: Board;
let pieces: Piece[];
let active: number;
let startButton: p5.Element;
let started: boolean;
let ended: boolean;
let whiteTurn: boolean;
let reset: boolean;
let wCheckMsg: p5.Element;
let bCheckMsg: p5.Element;

function setup(): void {
  createCanvas(1200, 1000);
  
  // add board
  board = new Board();
  pieces = [];
  started = false;
  ended = false;
  whiteTurn = false;
  reset = false;

  // add pawns
  for(let i = 0; i < 16; i++) {
    if(i < 8) {
      pieces.push(new Pawn('black', i + 48));
    } else {
      pieces.push(new Pawn('white', i));
    }
  }

  // rooks
  pieces.push(new Rook('black', 56));
  pieces.push(new Rook('black', 63));
  pieces.push(new Rook('white', 0));
  pieces.push(new Rook('white', 7));

  // knights
  pieces.push(new Knight('black', 57));
  pieces.push(new Knight('black', 62));
  pieces.push(new Knight('white', 1));
  pieces.push(new Knight('white', 6));

  // bishops
  pieces.push(new Bishop('black', 58));
  pieces.push(new Bishop('black', 61));
  pieces.push(new Bishop('white', 2));
  pieces.push(new Bishop('white', 5));

  // kings
  pieces.push(new King('black', 59));
  pieces.push(new King('white', 3));

  // queens
  pieces.push(new Queen('black', 60));
  pieces.push(new Queen('white', 4));

  // buttons
  startButton = createButton('Start');
  startButton.position(1100, 100);
  startButton.size(100, 30);
  startButton.mousePressed(startGame);

  // messages
  wCheckMsg = createP("");
  bCheckMsg = createP("");
}

function draw(): void {
  background(255);
  square(0, 0, 1000);
  board.draw(pieces, whiteTurn);
  pieces.forEach(p => p.draw());
} 

function mouseClicked(): boolean {
  if (!started) return false;
  if (mouseX <= 1000 && mouseY <= 1000) {
    const x = Math.floor(mouseX / 125);
    const y = Math.floor(mouseY / 125);
    const z = x + y * 8;

    let tile = board.tiles[z];
    // no tile selected
    if (active === undefined) {
      let piece = pieces.filter(p => p.loc === tile.index)[0];
      // this doesn't allow a piece to be selected unless it is the proper turn
      if (piece){
        if((piece.colour === 'white') === whiteTurn) {
          active = tile.index;
          tile.setActive();
        }
      }
    } else {
      // the same tile clicked twice
      if (board.tiles[active].index === tile.index) {
        tile.setInactive();
        active = undefined;
      } else {
        board.tiles[active].setInactive();

        // get active piece
        let piece: Piece;
        pieces.forEach(p => {
          if(p.loc === active) {
            piece = p;
          }
        });

        // stops king from moving in check
        if (piece.name === 'K') {
          if (piece.inCheck(pieces, z)) {
            piece = undefined;
            tile.setInactive;
            active = undefined;
          }
        }

        // move the piece if the piece exists
        if(piece) {
          if((piece.colour === 'white') === whiteTurn) {
            pieces = piece.movePiece(z, pieces);
            active = undefined;
            if(piece.loc === z) whiteTurn = !whiteTurn;
          } else {
            active = undefined;
          }
        }
      }
    }
  }

  // need this to update the dom with some kind of winner screen
  if(checkWinner()) {
    if(!whiteTurn) {
      console.log('White wins!');
    } else {
      console.log('Black wins!');
    }
    started = false;
    ended = true;
  }

  if (ended) return false;

  /*
  // look for check after each turn
  let king = whiteTurn
    ? pieces.filter(p => p.colour === 'white' && p.name === 'K')[0]
    : pieces.filter(p => p.colour === 'black' && p.name === 'K')[0];

  // clean this up after the AI is done
  if (king.inCheck(pieces, -1)) {
    if (king.colour === 'white') {
      wCheckMsg.html('White in check!');
    } else if (king.colour === 'black') {
      bCheckMsg.html('Black in check!');
    }
  } else {
    if (king.colour === 'white') {
      wCheckMsg.html('');
    } else if (king.colour === 'black') {
      bCheckMsg.html('');
    }
  }
  */

  // look for check each turn
  let kings = pieces.filter(p => p.name === 'K');

  if(kings[0].inCheck(pieces, -1))
      wCheckMsg.html('Black in check!');
  else
      wCheckMsg.html('');

  if(kings[1].inCheck(pieces, -1))
      bCheckMsg.html('White in check!');
  else
    bCheckMsg.html('');

  return false;
}

function startGame(): void {
  if(!started && !ended) {
    started = true;
    whiteTurn = true;
  }

  // update button name based on game state
  if (reset) {
    startButton.html('Start');
    setup();
  }

  if(started && !reset) {
    startButton.html('Reset');
    reset = true;
  }

}

function checkWinner(): boolean {
  const kings = pieces.filter(p => p.name === 'K');
  
  // end game if king has been taken
  if(kings.length < 2) return true;

  return false;
}

// highlight possible moves for the selected piece.
// handle check, checkmate, castling, en passant and pawn promotion

let board: Board;
let pieces: Piece[] = [];
let active: number;
let startButton: p5.Element;
let started = false;
let ended = false;
let whiteTurn = false;

function setup(): void {
  createCanvas(1200, 1000);
  
  // add board
  board = new Board();

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
}

function draw(): void {
  background(255);
  square(0, 0, 1000);
  board.draw();
  pieces.forEach(p => p.draw());
}

function mouseClicked(): boolean {
  if (!started) return false;
  if (mouseX <= 1000 && mouseY <= 1000) {
    const x = Math.floor(mouseX / 125);
    const y = Math.floor(mouseY / 125);
    const newLoc = x + y * 8;

    let tile = board.tiles[newLoc];
    // no tile selected
    if (active === undefined) {
      let tf = pieces.filter(p => p.loc === tile.index).length;
      if (tf === 1 ){
        active = tile.index;
        tile.setActive();
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

        // move the piece if the piece exists
        if(piece) {
          if((piece.colour === 'white') === whiteTurn){
            pieces = piece.movePiece(newLoc, pieces);
            active = undefined;
            if(piece.loc === newLoc) whiteTurn = !whiteTurn;
          } else {
            active = undefined;
          }
        }
      }
    }
  }
  if(checkWinner()) {
    if(!whiteTurn) {
      console.log('White wins!');
    } else {
      console.log('Black wins!');
    }
    started = false;
    ended = true;
  }
  return false;
}

function startGame(): void {
  if(!started && !ended) {
    started = true;
    whiteTurn = true;
  }
}

function checkWinner(): boolean {
  let kingCounter = 0;
  for(let p of pieces) {
    if(p.name === 'K') kingCounter++;
  }

  if(kingCounter < 2) return true;
  return false;
}


// handle check, checkmate, castling, en passant and pawn promotion

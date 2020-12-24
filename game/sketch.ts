let board: Board;
let pieces: Piece[] = [];
let active: number;

function setup() {
  createCanvas(1000, 1000);
  
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
}

function draw() {
  background(255);
  square(0, 0, 1000);
  board.draw();
  pieces.forEach(p => p.draw());
}

function mouseClicked() {
  if (mouseX <= 1000 && mouseY <= 1000) {
    const x = Math.floor(mouseX / 125);
    const y = Math.floor(mouseY / 125);
    const z = x + y * 8;

    let tile = board.tiles[z];
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

        // get active peice
        let piece: Piece;
        pieces.forEach(p => {
          if(p.loc === active) {
            piece = p;
          }
        });

        // move the piece if the piece exists
        if(piece) {
          pieces = piece.movePiece(z, pieces);
          active = undefined;
        }
      }
    }
  }
  return false;
}

import { eval_piece } from 'wasm_chess';
import Board from './Board';
import { 
    Pawn,
    Rook,
    Knight,
    Bishop,
    King,
    Queen
 } from './Piece';

let board;
let pieces = [];
let activeX;
let activeY;
let startButton;
let started;
let ended;
let whiteTurn;
let reset;
let wCheckMsg;
let bCheckMsg;

const sketch = (p) => {
    p.setup = function() {
    p.createCanvas(1200, 1000);
    
    // add board
    board = new Board();
    pieces = [];
    started = false;
    ended = false;
    whiteTurn = false;
    reset = false;

    // add pawns
    for(let i = 0; i < 8; i++) {
      pieces.push(new Pawn('white', i, 1));
      pieces.push(new Pawn('black', i, 6));
    }

    // rooks
    pieces.push(new Rook('white', 0, 0));
    pieces.push(new Rook('white', 7, 0));
    pieces.push(new Rook('black', 0, 7));
    pieces.push(new Rook('black', 7, 7));

    // knights
    pieces.push(new Knight('white', 1, 0));
    pieces.push(new Knight('white', 6, 0));
    pieces.push(new Knight('black', 1, 7));
    pieces.push(new Knight('black', 6, 7));

    // bishops
    pieces.push(new Bishop('white', 2, 0));
    pieces.push(new Bishop('white', 5, 0));
    pieces.push(new Bishop('black', 2, 7));
    pieces.push(new Bishop('black', 5, 7));

    // kings
    pieces.push(new King('white', 3, 0));
    pieces.push(new King('black', 3, 7));

    // queens
    pieces.push(new Queen('white', 4, 0));
    pieces.push(new Queen('black', 4, 7));

    // buttons
    startButton = p.createButton('Start');
    startButton.position(1100, 100);
    startButton.size(100, 30);
    startButton.mousePressed(startGame);

    // messages
    wCheckMsg = p.createP('');
    bCheckMsg = p.createP('');
    }

    p.draw = function() {
        board.draw(pieces, whiteTurn, activeX, activeY, p);
        pieces.forEach(piece => piece.draw(p));
    }

    p.mouseClicked = function() {
      if (!started) return false;
      if (p.mouseX <= 1000 && p.mouseY <= 1000) {
        const x = Math.floor(p.mouseX / 125);
        const y = Math.floor(p.mouseY / 125);

        const tile = board.tiles[y][x];
        // no tile selected
        if (activeX === undefined && activeY === undefined) {
          const piece = pieces.filter(p => p.x === tile.x && p.y === tile.y)[0];
          // this doesn't allow a piece to be selected unless it is the proper turn
          if (piece){
            if((piece.colour === 'white') === whiteTurn) {
              activeX = tile.x;
              activeY = tile.y;
              tile.setActive();
            }
          }
        } else {
          // the same tile clicked twice
          // look into the use of 2d array vs indexing later
          const st = board.tiles[activeY][activeX];
          if (st.x === tile.x && st.y === tile.y) {
            tile.setInactive();
            activeX = undefined;
            activeY = undefined;
          } else {
            st.setInactive();

            // get active piece
            let piece;
            pieces.forEach(p => {
              if(p.x === activeX && p.y === activeY) {
                piece = p;
              }
            });

            // need to handle inCheck 2d function
            // stops king from moving in check
            if (piece.name === 'K') {
              if (piece.inCheck(pieces, x, y)) {
                piece = undefined;
                tile.setInactive;
                activeX = undefined;
                activeY = undefined;
              }
            }


            // move the piece if the piece exists
            if(piece) {
              if((piece.colour === 'white') === whiteTurn) {
                pieces = piece.movePiece(x, y, pieces);
                activeX = undefined;
                activeY = undefined;
                if(piece.x === x && piece.y === y) whiteTurn = !whiteTurn;
              } else {
                activeX = undefined;
                activeY = undefined;
              }
            }
          }
        }
      }

      // for testing purposes
      //whiteTurn = true;
      //whiteTurn = false;

      if(!whiteTurn) {
        aiMove();
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

      // stop moves from being made if game over
      if (ended) return false;

      // look for check each turn on both kings and display message
      const kings = pieces.filter(p => p.name === 'K');

      if(kings[0].inCheck(pieces, kings[0].x, kings[0].y))
        wCheckMsg.html('White in check!');
      else
        wCheckMsg.html('');

      if(kings[1].inCheck(pieces, kings[1].x, kings[1].y))
        bCheckMsg.html('Black in check!');
      else
        bCheckMsg.html('');

      return false;
    }

    function startGame(p){
      if(!started && !ended) {
        started = true;
        whiteTurn = true;
      }

      // TODO: figure out check message reset issue
      // update button name based on game state
      if (reset) {
        startButton.html('Start');
        p.setup();
      }

      if(started && !reset) {
        startButton.html('Reset');
        reset = true;
      }

    }

    function checkWinner(){
      const kings = pieces.filter(p => p.name === 'K');
      
      // end game if king has been taken
      if(kings.length < 2) return true;

      return false;
    }

    function aiMove() {
      const piece = pieces[0];
      console.log(eval_piece(piece.x, piece.y, piece.name));
    }

}


new p5(sketch);
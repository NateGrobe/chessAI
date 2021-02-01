export class Piece {

  constructor() {
    this.colour;
    this.loc;
    this.name;
    this.check;
    this.x;
    this.y;
  }

  draw(p){
    const coords = [this.x * 125 + 50, this.y * 125 + 85];
    p.fill(this.colorToString(this.colour, p));
    p.strokeWeight(2);
    this.colour === 'white' ? p.stroke(0) : p.stroke(255);
    p.textSize(50);
    p.text(this.name, coords[0], coords[1]);
  }

  inCheck(pieces, newX, newY){ 
    return false;
  }

  colorToString(colour, p){
    return colour === 'black' ? p.color(0, 0, 0) : p.color(255, 255, 255);
  }

  movePiece(newX, newY, pieces){
    return pieces;
  }
}


export class Pawn extends Piece {
  // moves +8 or +16 on first turn
  constructor(colour, x, y) {
    super();
    this.name = 'P';
    this.colour = colour;
    this.x = x;
    this.y = y;
  }

  movePiece(newX, newY, pieces){
    let blocked = false;
    // handle white pawns
    if (this.colour === 'white') {
      // handle 1 or 2 tiles from start movement
      if(this.y === 1 && newX === this.x && (newY === this.y + 1 || newY === this.y + 2)) {
        for (const p of pieces) {
          if ((p.y === this.y + 1 && p.x === this.x) || (p.x === newX && p.y === newY)) {
            blocked = true;
            break;
          }
        }
        // handle 1 tile movement
      } else if(newY === this.y + 1 && newX === this.x) {
        for (const p of pieces) {
          if (p.x === newX && p.y === newY) {
            blocked = true;
            break;
          }
        }
        // handle removing opponent piece at a diagonal
      } else if (newX === this.x + 1 && newY === this.y + 1 || newX === this.x - 1 && newY === this.y + 1) {
        for (const p of pieces) {
          if ((p.x === newX && p.y === newY) && p.colour !== this.colour) {
            pieces = pieces.filter(rp => rp !== p);
            blocked = false;
            break;
          }
          blocked = true;
        }
      } else {
        blocked = true;
      }
    // handle black pawns
    } else {
      // handle 1 or tiles from start movement
      if(this.y === 6 && newX === this.x && (newY === this.y - 1 || newY === this.y - 2)) {
        for (const p of pieces) {
          if ((p.y === this.y - 1 && p.x === this.x) || (p.x === newX && p.y === newY)) {
            blocked = true;
            break;
          }
        }
        // handle 1 tile movement
      } else if(newY === this.y - 1 && newX === this.x) {
        for (const p of pieces) {
          if (p.x === newX && p.y === newY) {
            blocked = true;
            break;
          }
        }
        // handle removing opponent piece at a diagonal
      } else if (newX === this.x + 1 && newY === this.y - 1 || newX === this.x - 1 && newY === this.y - 1) {
        for (const p of pieces) {
          if ((p.x === newX && p.y === newY) && p.colour !== this.colour) {
            pieces = pieces.filter(rp => rp !== p);
            blocked = false;
            break;
          }
          blocked = true;
        }
      } else {
        blocked = true;
      }
    }

    if(!blocked) {
      this.x = newX;
      this.y = newY;
    }
    return pieces;
  }
}

export class Rook extends Piece {
  constructor(colour, x, y) {
    super();
    this.name = 'R';
    this.colour = colour;
    this.x = x;
    this.y = y;
  }

  // need to handle removing pieces still
  movePiece(newX, newY, pieces){
    let blocked = false;
    const piecesCopy = pieces;
    // moving down a column
    if (newY > this.y && newX === this.x) {
      for(let i = this.y; i <= newY; i++) {
        for(const p of pieces) {
          if ((p.y === i && p.x === this.x) && i !== this.y) {
            if((p.x === newX && p.y === newY) && p.colour !== this.colour){
              pieces = pieces.filter(rp => rp !== p);
              break;
            }
            blocked = true;
            break;
          }
        }
      }
      // move up a column
    } else if (newY < this.y && newX === this.x) {
      for(let i = this.y; i >= newY; i--) {
        for(const p of pieces) {
          if ((p.y === i && p.x === this.x) && i !== this.y) {
            if((p.x === newX && p.y === newY) && p.colour !== this.colour){
              pieces = pieces.filter(rp => rp !== p);
              break;
            }
            blocked = true;
            break;
          }
        }
      }
      // move right
    } else if (newX > this.x && newY === this.y) {
      for(let i = this.x; i <= newX; i++) {
        for(const p of pieces) {
          if ((p.x === i && p.y === this.y) && i !== this.x) {
            if((p.x === newX && p.y === newY) && p.colour !== this.colour){
              pieces = pieces.filter(rp => rp !== p);
              break;
            } 
            blocked = true;
            break;
          }
        }
      }
      // move left
    } else if (newX < this.x && newY === this.y) {
      for(let i = this.x; i >= newX; i--) {
        for(const p of pieces) {
          if ((p.x === i && p.y === this.y) && i !== this.x) {
            if((p.x === newX && p.y === newY) && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            } 
            blocked = true;
            break;
          }
        }
      }
    } else {
      blocked = true;
    }

    if(!blocked) {
      this.x = newX;
      this.y = newY;
      return pieces;
    }
    return piecesCopy;
  }
}

export class Bishop extends Piece {
  constructor(colour,  x, y) {
    super();
    this.name = 'B';
    this.colour = colour;
    this.x = x;
    this.y = y;
  }

  movePiece(newX, newY, pieces){
    let blocked = false;
    const piecesCopy = pieces;
    
    // moving down right
    if (newX > this.x && newY > this.y) {
      for(let i = this.y; i <= newY; i++) {
        for(const p of pieces) {
          if((p.y === i && p.x === this.x + (i - this.y)) && i !== this.y) {
            if((p.x === newX && p.y === newY) && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            } 
            blocked = true;
            break;
          }
        }
      }
      // move up right
    } else if (newX > this.x && newY < this.y) {
      for(let i = this.y; i >= newY; i--) {
        for(const p of pieces) {
          if((p.y === i && p.x === this.x + (this.y - i)) && i !== this.y) {
            if((p.x === newX && p.y === newY) && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            }
            blocked = true;
            break;
          }
        }
      }
      // move down left
    } else if (newX < this.x && newY > this.y){
      for(let i = this.y; i <= newY; i++) {
        for(const p of pieces) {
          if((p.y === i && p.x === this.x - (i - this.y)) && i !== this.y) {
            if((p.x === newX && p.y === newY) && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            }
            blocked = true;
            break;
          }
        }
      }
      // move up left
    } else if (newX < this.x && newY < this.y) {
      for(let i = this.y; i >= newY; i--) {
        for(const p of pieces) {
          if((p.y === i && p.x === this.x - (this.y - i)) && i !== this.y) {
            if((p.x === newX && p.y === newY) && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            }
            blocked = true;
            break;
          }
        }
      }
    } else {
      blocked = true;
    }

    if(!blocked) {
      this.x = newX;
      this.y = newY;
      return pieces;
    }
    return piecesCopy;
  }
}

export class Knight extends Piece {
  constructor(colour, x, y) {
    super();
    this.name = 'H';
    this.colour = colour;
    this.x = x;
    this.y = y;
  }

  movePiece(newX, newY, pieces){
    let blocked = false;
    if((Math.abs(newX - this.x) === 2 && Math.abs(newY - this.y) === 1) || (Math.abs(newY - this.y) === 2 && Math.abs(newX - this.x) === 1)) {
      for(const p of pieces) {
        if((p.x === newX && p.y === newY) && p.colour !== this.colour) {
          pieces = pieces.filter(rp => rp !== p);
          break;
        } else if((p.x === newX && p.y === newY) && p.colour === this.colour) {
          blocked = true;
          break;
        }
      }
    } else {
      blocked = true;
    }

    if(!blocked) {
      this.x = newX;
      this.y = newY;
    }
    return pieces;
  }
}

export class Queen extends Piece {
  constructor(colour, x, y) {
    super();
    this.name = 'Q';
    this.colour = colour;
    this.x = x;
    this.y = y;
  }

  movePiece(newX, newY, pieces){
    let blocked = false;
    const piecesCopy = pieces;

    // move down
    if (newY > this.y && newX === this.x) {
      for(let i = this.y; i <= newY; i++) {
        for(const p of pieces) {
          if ((p.y === i && p.x === this.x) && i !== this.y) {
            if((p.x === newX && p.y === newY) && p.colour !== this.colour){
              pieces = pieces.filter(rp => rp !== p);
              break;
            }
            blocked = true;
            break;
          }
        }
      }
      // move up
    } else if (newY < this.y && newX === this.x) {
      for(let i = this.y; i >= newY; i--) {
        for(const p of pieces) {
          if ((p.y === i && p.x === this.x) && i !== this.y) {
            if((p.x === newX && p.y === newY) && p.colour !== this.colour){
              pieces = pieces.filter(rp => rp !== p);
              break;
            }
            blocked = true;
            break;
          }
        }
      }
      // move right
    } else if (newX > this.x && newY === this.y) {
      for(let i = this.x; i <= newX; i++) {
        for(const p of pieces) {
          if ((p.x === i && p.y === this.y) && i !== this.x) {
            if((p.x === newX && p.y === newY) && p.colour !== this.colour){
              pieces = pieces.filter(rp => rp !== p);
              break;
            } 
            blocked = true;
            break;
          }
        }
      }
      // move left
    } else if (newX < this.x && newY === this.y) {
      for(let i = this.x; i >= newX; i--) {
        for(const p of pieces) {
          if ((p.x === i && p.y === this.y) && i !== this.x) {
            if((p.x === newX && p.y === newY) && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            } 
            blocked = true;
            break;
          }
        }
      }
      // move down right
    } else if (newX > this.x && newY > this.y) {
      for(let i = this.y; i <= newY; i++) {
        for(const p of pieces) {
          if((p.y === i && p.x === this.x + (i - this.y)) && i !== this.y) {
            if((p.x === newX && p.y === newY) && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            } 
            blocked = true;
            break;
          }
        }
      }
      // move up right
    } else if (newX > this.x && newY < this.y) {
      for(let i = this.y; i >= newY; i--) {
        for(const p of pieces) {
          if((p.y === i && p.x === this.x + (this.y - i)) && i !== this.y) {
            if((p.x === newX && p.y === newY) && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            }
            blocked = true;
            break;
          }
        }
      }
      // move down left
    } else if (newX < this.x && newY > this.y){
      for(let i = this.y; i <= newY; i++) {
        for(const p of pieces) {
          if((p.y === i && p.x === this.x - (i - this.y)) && i !== this.y) {
            if((p.x === newX && p.y === newY) && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            }
            blocked = true;
            break;
          }
        }
      }
      // move up left
    } else if (newX < this.x && newY < this.y) {
      for(let i = this.y; i >= newY; i--) {
        for(const p of pieces) {
          if((p.y === i && p.x === this.x - (this.y - i)) && i !== this.y) {
            if((p.x === newX && p.y === newY) && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            }
            blocked = true;
            break;
          }
        }
      }
    } else {
      blocked = true;
    }

    if(!blocked) {
      this.x = newX;
      this.y = newY;
      return pieces;
    }
    return piecesCopy;
  }
}

export class King extends Piece {
  constructor(colour, x, y) {
    super();
    this.name = 'K';
    this.colour = colour;
    this.x = x;
    this.y = y;
    this.check = false;
  }

  movePiece(newX, newY, pieces){
    let blocked;
    if(Math.abs(this.x - newX) < 2 && Math.abs(this.y - newY) < 2) {
      for(const p of pieces) {
        if((p.x === newX && p.y === newY) && p.colour !== this.colour) {
          pieces = pieces.filter(rp => rp !== p);
          break;
        } else if((p.x === newX && p.y === newY) && p.colour === this.colour) {
          blocked = true;
          break;
        }
      }
    } else {
      blocked = true;
    }

    if (!blocked) {
      this.x = newX;
      this.y = newY;
    }
    return pieces;
  }

  // add checkmate by calling this function on all moves for a king each turn
  inCheck(pieces, newX, newY){
    // check for pawns
    const pawns = pieces.filter(p => p.colour !== this.colour && p.name === 'P');
    for(let i = 0; i < pawns.length; i++) {
      const p = pawns[i];
      if((newX + 1 === p.x && newY + 1 === p.y) && p.colour === 'black') {
        this.check = true;
        console.log('pawn');
        return true;
      } else if ((newX - 1 === p.x && newY + 1 === p.y) && p.colour === 'black') {
        this.check = true;
        console.log('pawn');
        return true;
      } else if ((newX - 1 === p.x && newY - 1 === p.y) && p.colour === 'white') {
        this.check = true;
        console.log('pawn');
        return true;
      } else if ((newX + 1 === p.x && newY - 1 === p.y) && p.colour === 'white') {
        this.check = true;
        console.log('pawn');
        return true;
      }
    }

    // maybe expand this to handle vertical as well
    // horizontal
    /*
    const hvPieces = pieces.filter(p => Math.floor(p.loc / 8) === Math.floor(nl / 8) || p.loc % 8 === nl % 8);
    const threats = hvPieces.filter(p => p.colour !== this.colour && (p.name === 'R' || p.name === 'Q'));

    if (threats.length > 0) {
      for(let i = 0; i < threats.length; i++) {
        const t = threats[i];
        // check from left
        if (t.loc < nl && t.loc % 8 !== nl % 8) {
          const buffers = hvPieces.filter(p => p.loc < nl && p.loc > t.loc && p !== this);
          if (buffers.length === 0 && threats.length > 0) {
            console.log('left');
            this.check = true;
            return true;
          }
          // check from right
        } else if (t.loc > nl && t.loc % 8 !== nl % 8) {
          const buffers = hvPieces.filter(p => p.loc > nl && p.loc < t.loc && p !== this);
          if (buffers.length === 0 && threats.length > 0) {
            console.log('right');
            this.check = true;
            return true;
          }
        }
        // check from above
        if (t.loc < nl && t.loc % 8 === nl % 8) {
          const buffers = hvPieces.filter(p => p.loc % 8 === nl % 8 && p.loc < nl && p.loc > t.loc && p !== this);
          if (buffers.length === 0 && threats.length > 0) {
            console.log('above');
            this.check = true;
            return true;
          }
          // check from below
        } else if (t.loc > nl && t.loc % 8 === nl % 8) {
          const buffers = hvPieces.filter(p => p.loc % 8 === nl % 8 && p.loc > nl && p.loc < t.loc && p !== this);
          if (buffers.length === 0 && threats.length > 0) {
            console.log('below');
            this.check = true;
            return true;
          }
        }
      }
    }
    */

    this.check = false;
    return false;
  }
}


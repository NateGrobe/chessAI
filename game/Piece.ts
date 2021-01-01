class Piece {
  colour: string;
  loc: number;
  name: string;

  draw() {
    let coords = this.convertCoord(this.loc);
    fill(this.colorToString(this.colour));
    strokeWeight(2);
    this.colour === 'white' ? stroke(0) : stroke(255);
    textSize(50);
    text(this.name, coords[0], coords[1]);
  }

  // converts from 1D coordinates to 2D coordinates with offsets for letters
  private convertCoord(coord: number): number[] {
    let x: number;
    let y: number;

    if (coord === 0) {
      x = coord;
      y = Math.floor((coord + 1) / 8);
    } else if ((coord + 1) % 8 === 0) {
      x = 7;
      y = Math.floor((coord + 1) / 8) - 1;
    } else {
      x = ((coord + 1) % 8) - 1;
      y = Math.floor((coord + 1) / 8);
    }

    return [x * 125 + 50, y * 125 + 125 - 45];
  }

  private colorToString(colour: string): p5.Color{
    return colour === 'black' ? color(0, 0, 0) : color(255, 255, 255);
  }

  movePiece(newLoc: number, pieces: Piece[]): Piece[]{
    return pieces;
  }
}


class Pawn extends Piece {
  // moves +8 or +16 on first turn
  constructor(colour: string, sp: number) {
    super();
    this.name = 'P';
    this.colour = colour;
    this.loc = sp;
  }

  // need to add taking pawns at a diagonal and stop collisions
  movePiece(newLoc: number, pieces: Piece[]): Piece[] {
    let blocked = false;
    // handle white pawns
    if (this.colour === 'white') {
      // handle 1 or 2 tiles from start movement
      if(this.loc >= 7 && this.loc < 16 && (newLoc === this.loc + 8 || newLoc === this.loc + 16)) {
        for (let p of pieces) {
          if (p.loc === this.loc + 8 || p.loc === newLoc) {
            blocked = true;
            break;
          }
        }
        // handle 1 tile movement
      } else if(newLoc === this.loc + 8) {
        for (let p of pieces) {
          if (p.loc === newLoc) {
            blocked = true;
            break;
          }
        }
        // handle removing opponent piece at a diagonal
      } else if (newLoc === this.loc + 9 || newLoc === this.loc + 7) {
        for (let p of pieces) {
          if (p.loc === newLoc && p.colour !== this.colour) {
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
      if(this.loc >= 47 && this.loc < 56 && (newLoc === this.loc - 8 || newLoc === this.loc - 16)) {
        for (let p of pieces) {
          if (p.loc === this.loc - 8 || p.loc === newLoc) {
            blocked = true;
            break;
          }
        }
        // handle 1 tile movement
      } else if(newLoc === this.loc - 8) {
        for (let p of pieces) {
          if (p.loc === newLoc) {
            blocked = true;
            break;
          }
        }
        // handle removing opponent piece at a diagonal
      } else if (newLoc === this.loc - 9 || newLoc === this.loc - 7) {
        for (let p of pieces) {
          if (p.loc === newLoc && p.colour !== this.colour) {
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

    if(!blocked) this.loc = newLoc;
    return pieces;
  }
}


class Rook extends Piece {
  constructor(colour: string, sp: number) {
    super();
    this.name = 'R';
    this.colour = colour;
    this.loc = sp;
  }

  // need to handle removing pieces still
  movePiece(newLoc: number, pieces: Piece[]): Piece[] {
    let blocked = false;
    const piecesCopy = pieces;
    // moving down a column
    if (newLoc > this.loc && newLoc % 8 === this.loc % 8) {
      for(let i = this.loc; i <= newLoc; i += 8) {
        for(let p of pieces) {
          if(p.loc === i && i != this.loc) {
            if(p.loc === newLoc && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            } 
            blocked = true;
            break;
          }
        }
      }
      // move up a column
    } else if (newLoc < this.loc && newLoc % 8 === this.loc % 8) {
      for(let i = this.loc; i >= newLoc; i -= 8) {
        for(let p of pieces) {
          if(p.loc === i && i != this.loc) {
            if(p.loc === newLoc && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            }
            blocked = true;
            break;
          }
        }
      }
      // move right
    } else if (newLoc > this.loc && Math.floor((this.loc) / 8) === Math.floor((newLoc) / 8)) {
      for(let i = this.loc; i <= newLoc; i++) {
        for(let p of pieces) {
          if(p.loc === i && i != this.loc) {
            if(p.loc === newLoc && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            } 
            blocked = true;
            break;
          }
        }
      }
      // move left
    } else if (newLoc < this.loc && Math.floor((this.loc) / 8) === Math.floor((newLoc) / 8)) {
      for(let i = this.loc; i >= newLoc; i--) {
        for(let p of pieces) {
          if(p.loc === i && i != this.loc) {
            if(p.loc === newLoc && p.colour !== this.colour) {
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
      this.loc = newLoc;
      return pieces;
    }
    return piecesCopy;
  }
}

class Bishop extends Piece {
  constructor(colour: string, sp: number) {
    super();
    this.name = 'B';
    this.colour = colour;
    this.loc = sp;
  }

  movePiece(newLoc: number, pieces: Piece[]): Piece[] {
    let blocked = false;
    const piecesCopy = pieces;
    // moving down right
    if (newLoc > this.loc && (newLoc - this.loc) % 9 === 0) {
      for(let i = this.loc; i <= newLoc; i += 9) {
        for(let p of pieces) {
          if(p.loc === i && i != this.loc) {
            if(p.loc === newLoc && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            } 
            blocked = true;
            break;
          }
        }
      }
      // move up right
    } else if (newLoc < this.loc && (this.loc - newLoc) % 7 === 0) {
      for(let i = this.loc; i >= newLoc; i -= 7) {
        for(let p of pieces) {
          if(p.loc === i && i != this.loc) {
            if(p.loc === newLoc && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            }
            blocked = true;
            break;
          }
        }
      }
      // move down left
    } else if (newLoc > this.loc && (newLoc - this.loc) % 7 === 0){
      for(let i = this.loc; i <= newLoc; i += 7) {
        for(let p of pieces) {
          if(p.loc === i && i != this.loc) {
            if(p.loc === newLoc && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            }
            blocked = true;
            break;
          }
        }
      }
      // move up left
    } else if (newLoc < this.loc && (this.loc - newLoc) % 9 === 0) {
      for(let i = this.loc; i >= newLoc; i -= 9) {
        for(let p of pieces) {
          if(p.loc === i && i != this.loc) {
            if(p.loc === newLoc && p.colour !== this.colour) {
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
      this.loc = newLoc;
      return pieces;
    }
    return piecesCopy;
  }
}

class Knight extends Piece {
  constructor(colour: string, sp: number) {
    super();
    this.name = 'H';
    this.colour = colour;
    this.loc = sp;
  }

  movePiece(newLoc: number, pieces: Piece[]): Piece[] {
    const absDiff = Math.abs(newLoc - this.loc);
    let blocked = false;
    if(absDiff === 6 || absDiff === 10 || absDiff === 15 || absDiff === 17) {
      for(let p of pieces) {
        if(p.loc === newLoc && p.colour !== this.colour) {
          pieces = pieces.filter(rp => rp !== p);
          break;
        } else if(p.loc === newLoc && p.colour === this.colour) {
          blocked = true;
          break;
        }
      }
    } else {
      blocked = true;
    }

    if(!blocked) this.loc = newLoc;
    return pieces;
  }
}

class Queen extends Piece {
  constructor(colour: string, sp: number) {
    super();
    this.name = 'Q';
    this.colour = colour;
    this.loc = sp;
  }

  movePiece(newLoc: number, pieces: Piece[]): Piece[] {
    let blocked = false;
    const piecesCopy = pieces;

    // move up left
    if (newLoc > this.loc && (newLoc - this.loc) % 9 === 0) {
      for(let i = this.loc; i <= newLoc; i += 9) {
        for(let p of pieces) {
          if(p.loc === i && i != this.loc) {
            if(p.loc === newLoc && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            } 
            blocked = true;
            break;
          }
        }
      }
      // move up right
    } else if (newLoc < this.loc && (this.loc - newLoc) % 7 === 0) {
      for(let i = this.loc; i >= newLoc; i -= 7) {
        for(let p of pieces) {
          if(p.loc === i && i != this.loc) {
            if(p.loc === newLoc && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            }
            blocked = true;
            break;
          }
        }
      }
      // move down left
    } else if (newLoc > this.loc && (newLoc - this.loc) % 7 === 0){
      for(let i = this.loc; i <= newLoc; i += 7) {
        for(let p of pieces) {
          if(p.loc === i && i != this.loc) {
            if(p.loc === newLoc && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            }
            blocked = true;
            break;
          }
        }
      }
      // move up left
    } else if (newLoc < this.loc && (this.loc - newLoc) % 9 === 0) {
      for(let i = this.loc; i >= newLoc; i -= 9) {
        for(let p of pieces) {
          if(p.loc === i && i != this.loc) {
            if(p.loc === newLoc && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            }
            blocked = true;
            break;
          }
        }
      }
    } else if (newLoc > this.loc && newLoc % 8 === this.loc % 8) {
      for(let i = this.loc; i <= newLoc; i += 8) {
        for(let p of pieces) {
          if(p.loc === i && i != this.loc) {
            if(p.loc === newLoc && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            } 
            blocked = true;
            break;
          }
        }
      }
      // move up a column
    } else if (newLoc < this.loc && newLoc % 8 === this.loc % 8) {
      for(let i = this.loc; i >= newLoc; i -= 8) {
        for(let p of pieces) {
          if(p.loc === i && i != this.loc) {
            if(p.loc === newLoc && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            }
            blocked = true;
            break;
          }
        }
      }
      // move right
    } else if (newLoc > this.loc && Math.floor((this.loc) / 8) === Math.floor((newLoc) / 8)) {
      for(let i = this.loc; i <= newLoc; i++) {
        for(let p of pieces) {
          if(p.loc === i && i != this.loc) {
            if(p.loc === newLoc && p.colour !== this.colour) {
              pieces = pieces.filter(rp => rp !== p);
              break;
            } 
            blocked = true;
            break;
          }
        }
      }
      // move left
    } else if (newLoc < this.loc && Math.floor((this.loc) / 8) === Math.floor((newLoc) / 8)) {
      for(let i = this.loc; i >= newLoc; i--) {
        for(let p of pieces) {
          if(p.loc === i && i != this.loc) {
            if(p.loc === newLoc && p.colour !== this.colour) {
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
      this.loc = newLoc;
      return pieces;
    }
    return piecesCopy;
  }
}

class King extends Piece {
  constructor(colour: string, sp: number) {
    super();
    this.name = 'K';
    this.colour = colour;
    this.loc = sp;
  }
}

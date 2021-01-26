class Tile {
  active: boolean;
  x: number;
  y: number;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.active = false;
  }

  setActive(): void {
    this.active = true;
  }

  setInactive(): void {
    this.active = false;
  }
}

class Board {
  tiles: Tile[][] = [];

  constructor() {
    for(let i = 0; i < 8; i++) {
      const row = [];
      for(let j = 0; j < 8; j++) {
        row.push(new Tile(j, i));
      }
      this.tiles.push(row);
    }
  }

  draw(pieces: Piece[], whiteTurn: boolean, newX: number, newY: number): void {
    for(let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const x = 125 * i;
        const y = 125 * j;
        let colour = (i-j) % 2 === 0 ? color(240, 240, 240) : color(15, 15, 15);

        // highlight piece that is selected
        const activePiece = pieces.filter(p => p.x === newX && p.y === newY)[0];

        if(activePiece){
          if (this.tiles[j][i].active && (activePiece.colour === 'white') === whiteTurn) {
            colour = (i-j) % 2 === 0 ? color(200, 200, 200) : color(55, 55, 55);
          }
        }
        stroke(0,0,0);
        strokeWeight(1);
        fill(colour);
        square(x, y, 125);
      }
    }
  }
}

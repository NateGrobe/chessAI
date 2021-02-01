class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.active = false;
  }

  setActive(){
    this.active = true;
  }

  setInactive(){
    this.active = false;
  }
}

class Board {
  constructor() {
    this.tiles = [];
    for(let i = 0; i < 8; i++) {
      const row = [];
      for(let j = 0; j < 8; j++) {
        row.push(new Tile(j, i));
      }
      this.tiles.push(row);
    }
  }

  //draw(pieces, whiteTurn, newX, newY, p){
  draw(pieces, whiteTurn, newX, newY, p){
    for(let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const x = 125 * i;
        const y = 125 * j;
        let colour = (i-j) % 2 === 0 ? p.color(240, 240, 240) : p.color(15, 15, 15);

        // highlight piece that is selected
        const activePiece = pieces.filter(p => p.x === newX && p.y === newY)[0];

        if(activePiece){
          if (this.tiles[j][i].active && (activePiece.colour === 'white') === whiteTurn) {
            colour = (i-j) % 2 === 0 ? p.color(200, 200, 200) : p.color(55, 55, 55);
          }
        }
        p.stroke(0,0,0);
        p.strokeWeight(1);
        p.fill(colour);
        p.square(x, y, 125);
      }
    }
  }
}

export default Board;

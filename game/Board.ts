class Tile {
  active: boolean;
  index: number;
  
  constructor(index: number) {
    this.index = index;
    this.active = false;
  }

  setActive() {
    this.active = true;
  }

  setInactive() {
    this.active = false;
  }
}

class Board {
  tiles: Tile[] = [];

  constructor() {
    for(let i = 0; i < 64; i++) {
      this.tiles.push(new Tile(i));
    }
  }

  draw() {
    for(let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const x = 125 * i;
        const y = 125 * j;
        const colour = (i-j) % 2 == 0 ? color(255, 255, 255) : color(0, 0, 0);
        fill(colour);
        square(x, y, 125);
      }
    }
  }
}

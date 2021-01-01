class Tile {
  active: boolean;
  index: number;
  
  constructor(index: number) {
    this.index = index;
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
  tiles: Tile[] = [];

  constructor() {
    for(let i = 0; i < 64; i++) {
      this.tiles.push(new Tile(i));
    }
  }

  draw(): void {
    for(let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const x = 125 * i;
        const y = 125 * j;
        let colour = (i-j) % 2 == 0 ? color(255, 255, 255) : color(0, 0, 0);
        if (this.tiles[i + j*8].active) {
          colour = (i-j) % 2 == 0 ? color(200, 200, 200) : color(55,55,55);
        }
        fill(colour);
        square(x, y, 125);
      }
    }
  }
}

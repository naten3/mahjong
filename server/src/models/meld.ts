import { Tile } from './'

export class Meld {
  readonly id: number;
  readonly known: Boolean;
  readonly tiles: Array<Tile>;
  constructor(id: number, known: Boolean, tiles: Array<Tile>) {
    this.id = id;
    this.known = known;
    this.tiles = tiles;
  }
}

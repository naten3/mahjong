import { Tile } from './'

export class Meld {
  readonly known: Boolean;
  readonly tiles: Array<Tile>;
  constructor(known: Boolean, tiles: Array<Tile>) {
    this.known = known;
    this.tiles = tiles;
  }
}

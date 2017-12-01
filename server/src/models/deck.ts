import { Tile } from './'

export class Deck {
  readonly tiles: Array<Tile>;
  constructor(tiles: Array<Tile>) {
    this.tiles = tiles;
  }
}

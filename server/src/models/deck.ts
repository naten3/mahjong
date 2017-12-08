import { Tile } from './'

export class Deck {
  readonly tiles: Array<Tile>;
  constructor(tiles: Array<Tile>) {
    this.tiles = tiles;

    this.isEmpty = this.isEmpty.bind(this);
  }

  public isEmpty(): boolean {
    return this.tiles.length == 0;
  }
}

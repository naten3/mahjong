import { TileIdentifier } from './'

export class Tile {
  readonly id: number;
  readonly tileIdentifier: TileIdentifier
  constructor(id: number, tileIdentifier: TileIdentifier) {
    this.id = id;
    this.tileIdentifier = tileIdentifier;
  }
}

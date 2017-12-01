import { TileIdentifier } from './'

export class Tile{
  id: number;
  tileIdentifier: TileIdentifier
  constructor(id: number, tileIdentifier: TileIdentifier) {
    this.id = id;
    this.tileIdentifier = tileIdentifier;
  }
}

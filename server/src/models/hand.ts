import { Tile, Meld} from './'

export class Hand {
  readonly melds: Array<Meld>;
  readonly freeTiles: Array<Tile>;
  constructor(melds: Array<Meld>, freeTiles: Array<Tile>) {
    this.melds = melds;
    this.freeTiles = freeTiles;

    this.size = this.size.bind(this);
  }

  public size(): number {
    return this.melds.map(m => m.tiles.length).reduce((sum,n) => sum + n, 0)
    + this.freeTiles.length;
  }
}

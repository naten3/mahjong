import { Tile, Meld} from './'

export class Hand {
  readonly melds: Array<Meld>;
  readonly freeTiles: Array<Tile>;
  constructor(melds: Array<Meld>, freeTiles: Array<Tile>) {
    this.melds = melds;
    this.freeTiles = freeTiles;
  }
}

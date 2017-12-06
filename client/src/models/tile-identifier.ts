
export abstract class TileIdentifier {
  type: TileIdentifierType
}

export class NumberTile extends TileIdentifier {
  readonly type = TileIdentifierType.NUMBER
  numberValue: number;
  numberTileType: NumberTileType

  constructor (numberValue: number, numberTileType: NumberTileType) {
    super();
    if (numberValue > 9 || numberValue < 1) {
      throw new RangeError("number tile value must be between 1 and 9")
    }
    this.numberValue = numberValue;
    this.numberTileType = numberTileType;
  }
}

export abstract class HonorTile extends TileIdentifier {
  readonly type = TileIdentifierType.HONORS;
  honorTileType: HonorTileType;
}

export class DragonTile extends HonorTile {
  readonly honorTileType = HonorTileType.DRAGON;
  dragonTileType: DragonTileType;
  constructor(dragonTileType: DragonTileType) {
    super()
    this.dragonTileType = dragonTileType;
  }
}

export class WindTile extends HonorTile {
  readonly honorTileType = HonorTileType.WIND;
  windTileType: WindTileType;
  constructor(windTileType: WindTileType) {
    super()
    this.windTileType = windTileType;
  }
}

export class BonusTile extends TileIdentifier{
  readonly type = TileIdentifierType.BONUS;
  numberValue: number;
  bonusTileType: BonusTileType;
  constructor(numberValue: number, bonusTileType: BonusTileType) {
    super()
    this.numberValue = numberValue;
    this.bonusTileType = bonusTileType;
  }
}

export enum TileIdentifierType {
  NUMBER = 'NUMBER',
  HONORS = 'HONORS',
  BONUS = 'BONUS'
}

export enum NumberTileType {
  DOT = 'DOT',
  BAMBOO = 'BAMBOO',
  CHAR = 'CHAR'
}

export enum HonorTileType {
  WIND = 'WIND',
  DRAGON = 'DRAGON'
}

export enum DragonTileType {
  RED = 'R',
  GREEN = 'G',
  WHITE = 'W'
}

export enum WindTileType {
  EAST = 'E',
  SOUTH = 'S',
  WEST = 'W',
  NORTH = 'N'
}

export enum BonusTileType {
  FLOWER = 'FLOWER',
  SEASON = 'SEASON'
}

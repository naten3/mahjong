import { TileIdentifier,
  TileIdentifierType,
  NumberTile,
  NumberTileType,
  HonorTile,
  HonorTileType,
  DragonTile,
  DragonTileType,
  WindTile,
  WindTileType,
  BonusTile,
  BonusTileType} from '../models'
  
const numberTileMap = new Map([
  [NumberTileType.DOT, 'dot'],
  [NumberTileType.BAMBOO, 'bamboo'],
  [NumberTileType.CHAR, 'char']]);

const honorTileMap = new Map([
  [HonorTileType.WIND, 'wind'],
  [HonorTileType.DRAGON, 'dragon']]);

const dragonTileMap = new Map([
  [DragonTileType.R, 'red'],
  [DragonTileType.G, 'green'],
  [DragonTileType.W, 'white']]);

const windTileMap = new Map([
  [WindTileType.E, 'east'],
  [WindTileType.S, 'south'],
  [WindTileType.W, 'west'],
  [WindTileType.N, 'north']]);

const bonusTileMap = new Map([
  [BonusTileType.FLOWER, 'flower'],
  [BonusTileType.SEASON, 'season']]);

export function tileImageFromIdentifier(tid: TileIdentifier) {
  const urlPrefix = 'api/img/' //TODO fix proxy so don't need api hack
  const fileFormat = '.png'

  let prefix;
  let suffix;

  if (tid.type == TileIdentifierType.NUMBER) {
    let nt = tid as NumberTile;
    prefix = numberTileMap.get(nt.numberTileType)
    suffix = nt.numberValue.toString()
  }

  else if (tid.type == TileIdentifierType.HONORS) {
    let ht = tid as HonorTile;
    prefix = honorTileMap.get(ht.honorTileType)
    if (ht.honorTileType == HonorTileType.WIND) {
      let wt = ht as WindTile;
      suffix = windTileMap.get(wt.windTileType)
    } else {
      let dt = ht as DragonTile;
      suffix = dragonTileMap.get(dt.dragonTileType)
    }
  } else {
    let bt = tid as BonusTile;
    prefix = bonusTileMap.get(bt.bonusTileType);
    suffix = bt.numberValue.toString();
  }

  return `${urlPrefix}${prefix}-${suffix}${fileFormat}`
}

import { Request, Response } from 'express';
import { Tile, DragonTile, DragonTileType} from '../models'

export default class IndexController {
    public static read(req: Request, res: Response, next: Function): void {
        res.json(new Tile(1, new DragonTile(DragonTileType.RED)));
    }
}

export enum JsonType {
  FIRST_TYPE= 'FIRST_TYPE'
  , SECOND_TYPE = 'SECOND_TYPE'
}

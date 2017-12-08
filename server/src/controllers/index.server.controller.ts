import { Request, Response } from 'express';
import { Tile, DragonTile, DragonTileType} from '../models'

export class IndexController {
    public static read(req: Request, res: Response, next: Function): void {
        res.json(new Tile(1, new DragonTile(DragonTileType.R)));
    }
}

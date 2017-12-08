import { Request, Response } from 'express';
import { Tile, DragonTile, DragonTileType} from '../models';

import { GameService} from '../services'

export class GameController {
  gameService: GameService;
  constructor(gameService: GameService) {
    this.gameService = gameService;

    this.draw = this.draw.bind(this);
  }

  public draw(req: Request, res: Response, next: Function): void {
    // @ts-ignore jwt added by middleware
    this.gameService.draw(req.jwt.payload.id)
  }
}

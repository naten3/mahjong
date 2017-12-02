import { Request, Response } from 'express';
import { Tile, DragonTile, DragonTileType} from '../models'
import * as Jwt from 'jwt-express'

import { UserService} from '../services'

export class UserController {
  userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;

    this.read = this.read.bind(this);
  }

    public read(req: Request, res: Response, next: Function): void {
        if (!req.query.name) {
          throw new Error("no name on request")
        }
        res.json(this.userService.signIn(req.params.name));
    }
}

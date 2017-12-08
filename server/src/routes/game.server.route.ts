import { Express } from "express";
import {Config} from '../config/config'

import { GameController } from "../controllers/";
import {GameService} from '../services';

export class GameRoute {
	gameController: GameController;
	constructor(app: Express, gameService: GameService) {
		this.gameController = new GameController(gameService);

		app.route("/api/game/draw")
		.get(Config.requireId, this.gameController.draw);
	}
}

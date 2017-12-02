import { Express } from "express";
import {IndexController} from "../controllers/";
import {Config} from '../config/config'

export class IndexRoute {
	constructor(app: Express) {
		app.route("/api")
			.get(Config.requireId, IndexController.read);
	}
}

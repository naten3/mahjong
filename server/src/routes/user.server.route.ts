import { Express } from "express";
import {Config} from '../config/config'

import {UserController, IndexController} from "../controllers/";
import {UserService} from '../services';

export class UserRoute {
	userController: UserController;
	constructor(app: Express, userService: UserService) {
		this.userController = new UserController(userService);

		app.route("/api/users")
		.get(this.userController.read);
	}
}

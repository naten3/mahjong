import { Express } from "express";
import {Config} from '../config/config'

import {UserController, IndexController} from "../controllers/";
import {UserService} from '../services';

//TODO this doesn't validate the token wtf
export class UserRoute {
	userController: UserController;
	constructor(app: Express, userService: UserService) {
		this.userController = new UserController(userService);

		app.route("/api/users")
		.get(this.userController.read);
	}
}

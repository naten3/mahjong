import { sync } from "glob";
import { union } from "lodash";
import * as Jwt from 'jwt-express'

export class Config {
	public static port: number = 3000;
	public static routes: string = "./dist/routes/**/*.js";
	public static models: string = "./dist/models/**/*.js";
	//TODO where should this live
	public static requireId = Jwt.require('id');
	public static validToken = Jwt.valid()

	public static globFiles(location: string): string[] {
		return union([], sync(location));
	}
}

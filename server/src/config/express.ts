import * as bodyParser from "body-parser";
import {Config} from "./config";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import * as proxy from 'http-proxy-middleware';
import * as Jwt from 'jwt-express'

import { IndexRoute, UserRoute } from '../routes';
import { UserService, WebsocketService} from '../services';

export default function(websocketService: WebsocketService, secret: string) {
    //service initializations TODO DI?
    let userService: UserService = new UserService(secret);

    let app: express.Express = express();

    //Models
    for (let model of Config.globFiles(Config.models)) {
        require(path.resolve(model));
    }

    // view engine setup
    app.set("views", path.join(__dirname, "../../src/views"));
    app.set("view engine", "jade");

    //app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
    app.use(logger("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "../../src/public")));

    if (app.get("env") === "development") {
      const apiProxy = proxy('!/api/**', {target: 'http://localhost:3001'});
      app.use('/', apiProxy);
    }

    app.use(Jwt.init(secret, {cookies: false}));

    //Routes
    new IndexRoute(app);
    new UserRoute(app, userService);

    // catch 404 and forward to error handler
    app.use((req: express.Request, res: express.Response, next: Function): void => {
        let err: Error = new Error("Not Found");
        next(err);
    });

    // production error handler
    app.use((err: any, req: express.Request, res: express.Response, next): void => {
        res.status(err.status || 500).render("error", {
            message: err.message,
            error: {}
        });
    });

    if (app.get("env") === "development") {
        app.use((err: Error, req: express.Request, res: express.Response, next): void => {
            res.status(500).render("error", {
                message: err.message,
                error: err
            });
        });
    }

    return app;
};

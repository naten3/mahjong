import * as http from "http";
import {Config} from "./config/config";

import { WebsocketService } from './services';


let secret: string = '4'// Math.floor(Math.random() * 1000).toString();
console.log(`The secret is ${secret}`) //todo remove debug code

let websocketService: WebsocketService = new WebsocketService(secret);

// Init the express application
const app = require("./config/express").default(websocketService, secret);

const server: http.Server = http.createServer(app);

//TODO cleaner way to do this
websocketService.socksJsServer.installHandlers(server, {prefix: '/api/ws'})

server.listen(Config.port);

server.on("error", (e : Error) => {
  console.log("Error starting server" + e);
});

server.on("listening", () => {
  console.log("Server started on port " + Config.port);
});

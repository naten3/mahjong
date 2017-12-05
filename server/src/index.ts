import * as http from "http";
import {Config} from "./config/config";

import { WebsocketService } from './services';


let websocketService: WebsocketService = new WebsocketService();
// Init the express application
const app = require("./config/express").default();

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

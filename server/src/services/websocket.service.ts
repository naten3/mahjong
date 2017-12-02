import * as SocksJs from 'socksjs'
import { Connection } from 'socksjs'
import * as http from 'http'

class connectionMap{

}


export class WebsocketService {
  readonly PREFIX_URL = '/api/ws'

  clients: Map<String, any>;
  server;

  constructor() {
    this.server = SocksJs.createServer({prefix: this.PREFIX_URL});
    this.server.on('connection', conn => this.onConnection(conn))
  }


  private onConnection(connection: Connection) {
    connection.on('data', (data) => this.onData(data));
    connection.on('close', () => this.onClose(connection))
  }

  private onClose(connection: Connection) {

  }

  private onData(message: WSMessage) {

  }

}

interface WSMessage {
  messageType: WSMessageType
}

enum WSMessageType {

}

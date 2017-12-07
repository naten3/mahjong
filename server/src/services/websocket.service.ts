import * as SockJs from 'sockjs'
import { Connection } from 'sockjs'
import * as http from 'http'
import { Subject, Observable, ReplaySubject, BehaviorSubject } from 'rxjs'
import * as JsonWebToken from 'jsonwebtoken';

import {WsPayload} from '../models'


export class UserWebsocket {
  //TODO handle multiple websockets in a browser
  userId: number;
  private messageSubject: Subject<string>; //todo more type safe

  constructor(userId: number, messageSubject: Subject<string>) {
    this.userId = userId;
    this.messageSubject = messageSubject;
  }

  send(payload: WsPayload<any>) {
    this.messageSubject.next(JSON.stringify(payload))
  }
}

export class WebsocketService {

  private secret: string;
  readonly PREFIX_URL = '/api/ws'

   //TODO can I make this a big observable?
  clients: Map<number, UserWebsocket> = new Map();
  clientChangeObservable = new BehaviorSubject(new Map<number, UserWebsocket>());

  onlineUsers: BehaviorSubject<Map<number, UserWebsocket>>  = new BehaviorSubject(new Map);

  socksJsServer;

  constructor(secret: string) {
    this.secret = secret;
    this.socksJsServer = SockJs.createServer({prefix: this.PREFIX_URL});
    this.socksJsServer.on('connection', conn => this.onConnection(conn))
  }

  addUser(userId: number, uws: UserWebsocket) {
    console.log(`adding user with id ${userId}`)
    this.clients.set(userId, uws)
    this.clientChangeObservable.next(this.clients);
  }

  removeUser(userId: number) {
    console.log(`removing user with id ${userId}`)
    this.clients.delete(userId)
    this.clientChangeObservable.next(this.clients);
  }

  private onConnection(connection: Connection) {
    connection.on('data', (data) => this.onData(data, connection));
    connection.on('close', () => this.onClose(connection))
  }

  private onClose(connection: Connection) {
    console.log("closed the connection");
  }

  private onData(message: string, connection: Connection) {
    let obj = JSON.parse(message);
    if (obj.token ) {
      console.log("got token to authenticate user")
      try {
      let payload = JsonWebToken.verify(obj.token, this.secret);
      let id = payload.id;

      let messageSubject: Subject<string> = new Subject();
      messageSubject.subscribe(message => connection.write(message))

      connection.on('data', (data) => this.authenticatedOnData(data));
      connection.on('close', () => this.authenticatedOnClose(id));

      this.addUser(id, new UserWebsocket(id,  messageSubject));
      } catch (error){
        //TODO
        console.log("Got an error parsing token")
      }
    }
  }

  private authenticatedOnData(data) {
    //we don't care about anything else they send just yet
  }

  private authenticatedOnClose(id: number) {
    // notify anyone listening that this user is gone, TODO multiple tabs/windows
    this.removeUser(id);
  }
}

interface WSMessage {
  messageType: WSMessageType
}

enum WSMessageType {

}

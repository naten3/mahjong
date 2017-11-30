import { } from 'redux';

import { WsPayload } from '../models'
import { ActionTypeKeys } from '../actions';

export const socketMiddleware = (function(socketUrl: string) {
  var socket;

  const onOpen = (socket: WebSocket, store,username) => evt => {
    //Send a handshake, or authenticate with remote end
    socket.send(JSON.stringify({type: 'setName', name: username}));
    //Tell the store we're connected
    store.dispatch({type: ActionTypeKeys.WS_CONNECTED});
  }

  const onClose = (store) => evt => {
    //Tell the store we've disconnected
    store.dispatch({type: ActionTypeKeys.WS_DISCONNECTED});
  }

  const onMessage = (store) => evt => {
    //Parse the JSON message received on the websocket
    var msg: WsPayload = JSON.parse(evt.data);
    store.dispatch({type: ActionTypeKeys.SOCKET_RECEIVE, payload: msg});
    }

  return store => next => action => {
    switch(action.type) {

      case ActionTypeKeys.SOCKET_SEND:
        socket.send(JSON.stringify(action.payload));
        break;
      //The user wants us to connect
      case ActionTypeKeys.WS_CONNECT:
        //Start a new connection to the server
        if(socket) {
          socket.close();
        }
        //Attempt to connect (we could send a 'failed' action on error)
        socket = new WebSocket(socketUrl);
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(socket, store,action.payload);

        break;

      //The user wants us to disconnect
      case ActionTypeKeys.WS_DISCONNECT:
        if(socket) {
          socket.close();
        }
        socket = null;
        break;

      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  };
});

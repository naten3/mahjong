import { } from 'redux';
import * as SockJS from 'sockjs-client';

import { WsPayload } from '../models'
import { ActionTypeKeys } from '../actions';

export const socketMiddleware = (function(socketUrl: string) {
  var socketClient;

  const onOpen = (socketClient, store,token) => evt => {
    //Send a handshake, or authenticate with remote end
    socketClient.send(JSON.stringify({ token: token}));
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
        socketClient.send(JSON.stringify(action.payload));
        break;
      //The user wants us to connect
      case ActionTypeKeys.WS_CONNECT:
        //Start a new connection to the server
        if(socketClient) {
          socketClient.close();
        }
        //Attempt to connect (we could send a 'failed' action on error)
        socketClient = new SockJS(socketUrl);
        socketClient.onmessage = onMessage(store);
        socketClient.onclose = onClose(store);
        socketClient.onopen = onOpen(socketClient, store,action.payload);

        break;

      //The user wants us to disconnect
      case ActionTypeKeys.WS_DISCONNECT:
        if(socketClient) {
          socketClient.close();
        }
        socketClient = null;
        break;

      //This action is irrelevant to us, pass it on to the next middleware
      default:
        return next(action);
    }
  };
});

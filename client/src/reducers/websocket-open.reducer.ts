import { } from 'redux'
import { ActionTypeKeys, ActionTypes } from '../actions';


export function websocketOpenReduce(state: boolean = false, action: ActionTypes ): boolean {
  switch(action.type) {
  case ActionTypeKeys.WS_CONNECTED:
    console.log("updating state to websocket open")
    return true;
  case ActionTypeKeys.WS_DISCONNECTED:
  console.log("updating state to websocket closed")
    return false
  default:
    return state;
  }
}

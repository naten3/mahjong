import { } from 'redux'

import { PlayerCountChangeMessage,  WSPayloadTypeKey } from '../models'
import { ActionTypeKeys, ActionTypes } from '../actions';


export function playersWaitingReducer(state: number = 0, action: ActionTypes ): number {
  switch(action.type) {
  case ActionTypeKeys.SOCKET_RECEIVE:
    if (action.payload.type == WSPayloadTypeKey.PLAYER_COUNT_CHANGE) {
      return (action.payload as PlayerCountChangeMessage).playerCount
    } else {
      return state
    }
  default:
    return state;
  }
}

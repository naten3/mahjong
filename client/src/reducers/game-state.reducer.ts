import { } from 'redux'

import { WSPayloadTypeKey, UserFacingGameState, UserFacingGameStateType, GameStateUpdate } from '../models'
import { ActionTypeKeys, ActionTypes } from '../actions';

export function gameStateReducer(state: UserFacingGameState = { type: UserFacingGameStateType.UNKNOWN},
     action: ActionTypes ): UserFacingGameState {
  switch(action.type) {
  case ActionTypeKeys.SOCKET_RECEIVE:
    if (action.payload.type == WSPayloadTypeKey.GAME_STATE_UPDATE) {
      return (action.payload as GameStateUpdate).gameState
    } else {
      return state
    }
  case ActionTypeKeys.GAME_STATE_UPDATE:
    return action.payload  
  default:
    return state;
  }
}

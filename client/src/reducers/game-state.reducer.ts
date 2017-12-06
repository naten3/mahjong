import { } from 'redux'

import { WSPayloadTypeKey, UserFacingGameState, GameStateUpdate } from '../models'
import { ActionTypeKeys, ActionTypes } from '../actions';


export function gameStateReducer(state: UserFacingGameState | null = null,
     action: ActionTypes ): UserFacingGameState | null {
  switch(action.type) {
  case ActionTypeKeys.SOCKET_RECEIVE:
    if (action.payload.type == WSPayloadTypeKey.GAME_STATE_UPDATE) {
      return (action.payload as GameStateUpdate).gameState
    } else {
      return state
    }
  default:
    return state;
  }
}

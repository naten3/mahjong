import { GameOptions } from '../models'
import { ActionTypes } from '../actions'

//TODO get this from the server
export function gameOptionsReducer(state: GameOptions,
     action: ActionTypes ): GameOptions {
  return {
    bonusTiles: true,
    tilesPerHand: 13
  }
}

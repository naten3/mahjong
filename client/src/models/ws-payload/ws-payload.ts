import { UserFacingGameState } from '../'

export interface WsPayload {
  type: WSPayloadTypeKey;
}

export interface PlayerCountChangeMessage extends WsPayload {
  type: WSPayloadTypeKey.PLAYER_COUNT_CHANGE
  playerCount: number;
}

export class GameStateUpdate  implements WsPayload {
  type = WSPayloadTypeKey.GAME_STATE_UPDATE;
  gameState: UserFacingGameState;

  constructor(gameState: UserFacingGameState) {
    this.gameState = gameState;
  }
}

export enum WSPayloadTypeKey {
  PLAYER_COUNT_CHANGE = 'PLAYER_COUNT_CHANGE',
  GAME_STATE_UPDATE = 'GAME_STATE_UPDATE'
}

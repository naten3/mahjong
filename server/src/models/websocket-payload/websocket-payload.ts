import { UserFacingGameState } from '../'

export interface WsPayload<T> {
  type: WSPayloadTypeKey;
}

export enum WSPayloadTypeKey {
  PLAYER_COUNT_CHANGE = 'PLAYER_COUNT_CHANGE',
  GAME_STATE_UPDATE = 'GAME_STATE_UPDATE'
}

export class PlayerCountChangeMessage implements WsPayload<number> {
  type = WSPayloadTypeKey.PLAYER_COUNT_CHANGE;
  playerCount: number;

  constructor(playerCount) {
    this.playerCount = playerCount;
  }
}

export class GameStateUpdate  implements WsPayload<UserFacingGameState> {
  type = WSPayloadTypeKey.GAME_STATE_UPDATE;
  gameState: UserFacingGameState;

  constructor(gameState: UserFacingGameState) {
    this.gameState = gameState;
  }
}

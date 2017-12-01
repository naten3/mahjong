export abstract class GameState {
  gameStateType: GameStateType;
}

export enum GameStateType {
  WAITING = 'WAITING',
  ACTIVE = 'ACTIVE'
}

export class ActiveGameState extends GameState {
  readonly gameStateType = GameStateType.ACTIVE
}

export class WaitingGameState extends GameState {
  readonly gameStateType = GameStateType.ACTIVE
}

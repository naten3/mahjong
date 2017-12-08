import { Player, User, Deck, PlayerPosition, Tile } from './'

export interface GameState {
  type: GameStateType;
}

export enum GameStateType {
  WAITING = 'WAITING',
  ACTIVE = 'ACTIVE'
}

export class ActiveGameState implements GameState {
  readonly type = GameStateType.ACTIVE
  readonly players: Array<Player>
  readonly deck: Deck;
  readonly currentTurn: PlayerPosition;
  readonly discard?: Tile;
  constructor(players: Array<Player>, deck: Deck, currentTurn: PlayerPosition, discard: Tile | null) {
    this.players = players;
    this.deck = deck;
    this.currentTurn = currentTurn;
    this.discard = discard;
  }
}

export class WaitingGameState implements GameState {
  readonly type = GameStateType.WAITING
  waitingOnPlayers: Array<Player>;

  constructor(waitingOnPlayers: Array<Player>) {
    this.waitingOnPlayers = waitingOnPlayers;
  }
}

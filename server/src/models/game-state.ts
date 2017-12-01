import { Player, User, Deck } from './'

export abstract class GameState {
  gameStateType: GameStateType;
}

export enum GameStateType {
  WAITING = 'WAITING',
  ACTIVE = 'ACTIVE'
}

export class ActiveGameState extends GameState {
  readonly gameStateType = GameStateType.ACTIVE
  players: Array<Player>
  deck: Deck;
  constructor(players: Array<Player>, deck: Deck) {
    super()
    this.players = players;
    this.deck = deck;
  }
}

export class WaitingGameState extends GameState {
  readonly gameStateType = GameStateType.WAITING
  users: Array<User>;

  constructor(users: Array<User>) {
    super()
    this.users = users;
  }
}

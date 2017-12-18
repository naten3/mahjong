import { Tile, PlayerPosition, Hand } from '../'

export interface UserFacingGameState {
  type: UserFacingGameStateType
}

export enum UserFacingGameStateType {
  ACTIVE = 'ACTIVE',
  WAITING = 'WAITING',
  NOT_STARTED = 'NOT_STARTED'
}

export class UserFacingWaitingGameState implements UserFacingGameState{
  type = UserFacingGameStateType.WAITING;
  waitingOnPlayers: Array<PlayerPosition>;

  constructor(waitingOnPlayers: Array<PlayerPosition>) {
    this.waitingOnPlayers = waitingOnPlayers;
  }
}

export class UserNotStartedGameState implements UserFacingGameState {
  type = UserFacingGameStateType.NOT_STARTED;
}

export class UserFacingActiveGameState implements UserFacingGameState {
  type = UserFacingGameStateType.ACTIVE
  otherPlayers: Array<UserFacingPlayer>;
  userHand: Hand;
  currentTurn: PlayerPosition;
  myPosition: PlayerPosition;

  constructor(otherPlayers: Array<UserFacingPlayer>, userHand: Hand, currentTurn: PlayerPosition,
  myPosition: PlayerPosition ) {
    this.otherPlayers = otherPlayers;
    this.userHand = userHand;
    this.currentTurn = currentTurn;
    this.myPosition = myPosition;
  }
}

export class UserFacingPlayer {
  freeTileCount: number;
  melds: Array<UserFacingMeld>;
  name: string;
  position: PlayerPosition;

  constructor(  freeTileCount: number,
    melds: Array<UserFacingMeld>,
    name: string,
    position: PlayerPosition) {
      this.melds = melds;
      this.name = name;
      this.position = position;
    }
}

export interface UserFacingMeld {
  type: UserMeldType;
}

export class UserKnownMeld implements UserFacingMeld {
  type = UserMeldType.KNOWN;
  tiles: Array<Tile>;

  constructor(tiles: Array<Tile>) {
    this.tiles = tiles;
  }
}

export class UserConcealedMeld implements UserFacingMeld {
  type = UserMeldType.CONCEALED;
  tileCount: number;

  constructor(tileCount: number) {
    this.tileCount = tileCount;
  }
}

export enum UserMeldType {
  KNOWN = 'KNOWN',
  CONCEALED = 'CONCEALED'
}

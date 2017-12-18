import { Tile, Hand } from './'

export interface UserFacingGameState {
  type: UserFacingGameStateType
}

export enum UserFacingGameStateType {
  ACTIVE = 'ACTIVE',
  WAITING = 'WAITING',
  UNKNOWN = 'UNKNOWN',
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

export interface UserFacingActiveGameState extends UserFacingGameState {
  otherPlayers: Array<UserFacingPlayer>;
  userHand: Hand;
  currentTurn: PlayerPosition;
  myPosition: PlayerPosition;
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

export enum PlayerPosition {
  EAST = 'E',
  SOUTH = 'S',
  WEST = 'W',
  NORTH = 'N'
}

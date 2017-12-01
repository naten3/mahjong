import {User, Hand} from './'

export class Player{
user: User
hand: Hand
position: PlayerPosition
  constructor(user: User, hand: Hand, position: PlayerPosition) {
    this.user = user;
    this.hand = hand;
    this.position = position;
  }

}

export enum PlayerPosition {
  EAST = 'E',
  SOUTH = 'S',
  WEST = 'W',
  NORTH = 'N'
}

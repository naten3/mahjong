import {User, Hand} from './'

export class Player{
user: User
hand: Hand
position: PlayerPosition
  constructor(user: User, hand: Hand, position: PlayerPosition) {
    this.user = user;
    this.hand = hand;
    this.position = position;

    this.withHand = this.withHand.bind(this);
  }

  withHand(hand: Hand): Player {
    return new Player(this.user, hand, this.position);
  }

}

export enum PlayerPosition {
  E = 'E',
  S = 'S',
  W = 'W',
  N = 'N'
}

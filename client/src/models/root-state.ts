import {UserFacingGameState} from './'

export interface RootState {
  token?: string;
  websocketOpen: boolean;
  playersWaiting: number;
  gameState?: UserFacingGameState;
}

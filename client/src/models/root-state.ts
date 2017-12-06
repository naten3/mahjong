export interface RootState {
  token?: string;
  websocketOpen: boolean;
  playersWaiting: number;
}

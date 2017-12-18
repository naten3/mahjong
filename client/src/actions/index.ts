import Axios, {AxiosResponse} from 'axios';

import { Action } from 'redux';

import { Weather, WsPayload, TokenResponse, UserFacingGameState } from '../models';

const API_KEY='5fe0935d1398f3033936b734d3839dc7';
const ROOT_URL=`https://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export function fetchWeather(city: String): PromiseAction<AxiosResponse<Weather>, FetchWeatherAction> {
  const url = `${ROOT_URL}&q=${city},us`;
  const request: Promise<AxiosResponse<Weather>> = Axios.get<Weather>(url);
  return {
    type: ActionTypeKeys.FETCH_WEATHER,
    payload: request
  }

}

export enum ActionTypeKeys {
  FETCH_WEATHER = 'FETCH_WEATHER',

  DRAW = 'DRAW',
  DRAW_FAIL = 'DRAW_FAIL',
  DRAW_SUCCESS = 'DRAW_SUCCESS',

  REQUEST_GAME_STATE = 'REQUEST_GAME_STATE',
  GAME_STATE_UPDATE = 'GAME_STATE_UPDATE',
  REQUEST_GAME_STATE_FAIL = 'REQUEST_GAME_STATE_FAIL',

  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  SOCKET_RECEIVE = 'SOCKET_RECEIVE',
  SOCKET_SEND = 'SOCKET_SEND',
  WS_CONNECT = 'WS_CONNECT',
  WS_DISCONNECT = 'WS_DISCONNECT',
  WS_CONNECTED = 'WS_CONNECTED',
  WS_DISCONNECTED = 'WS_DISCONNECTED',
  OTHER_ACTION = 'this_will_never_happen'
}

export interface PayloadAction<T> extends Action<ActionTypeKeys> {
  payload: T;
}

export interface FetchWeatherAction extends PayloadAction<AxiosResponse<Weather>> {
  type: ActionTypeKeys.FETCH_WEATHER;
}

export interface ApiRequestAction extends Action<ActionTypeKeys> {
  token: string
}

export interface DrawAction extends ApiRequestAction {
  type: ActionTypeKeys.DRAW;
}

export interface RequestGameStateAction extends ApiRequestAction {
  type: ActionTypeKeys.REQUEST_GAME_STATE
}

export interface GameStateUpdateAction extends PayloadAction<UserFacingGameState> {
  type: ActionTypeKeys.GAME_STATE_UPDATE;
}

export interface DrawSuccessAction extends Action<ActionTypeKeys> {
  type: ActionTypeKeys.DRAW_SUCCESS;
}

export interface DrawFailAction extends Action<ActionTypeKeys> {
  type: ActionTypeKeys.DRAW_FAIL;
  message: string;
}

export interface SignInAction extends PayloadAction<AxiosResponse<TokenResponse>> {
  type: ActionTypeKeys.SIGN_IN;
}

export interface SignOutAction extends Action<ActionTypeKeys> {
  type: ActionTypeKeys.SIGN_OUT;
}

//TODO remove redux promise and these
export interface PromiseAction<T, _ extends PayloadAction<T>> {
  payload: Promise<T>;
  type: ActionTypeKeys;
}

//axios response with middleware will have this payload
export interface ApiResponseAction<T> extends PayloadAction<Promise<AxiosResponse<T>>> {
  payload: Promise<AxiosResponse<T>>
}

// websockets action
export interface SocketReceiveAction extends PayloadAction<WsPayload> {
  type: ActionTypeKeys.SOCKET_RECEIVE;
  payload: WsPayload
}

// websockets action
export interface SocketSendAction extends PayloadAction<WsPayload> {
  type: ActionTypeKeys.SOCKET_SEND;
  payload: WsPayload
}

// payload is token
export interface WSConnectAction extends PayloadAction<string> {
  type: ActionTypeKeys.WS_CONNECT;
  payload: string;
}

export interface WSDisconnectAction extends Action<ActionTypeKeys> {
  type: ActionTypeKeys.WS_DISCONNECT;
}

export interface WSConnectedAction extends Action<ActionTypeKeys> {
  type: ActionTypeKeys.WS_CONNECTED;
}

export interface WSDisconnectedAction extends Action<ActionTypeKeys> {
  type: ActionTypeKeys.WS_DISCONNECTED;
}

export type ActionTypes =
   | FetchWeatherAction
   | DrawAction
   | GameStateUpdateAction
   | SignInAction
   | SignOutAction
   | SocketReceiveAction
   | SocketSendAction
   | WSConnectAction
   | WSDisconnectAction
   | WSConnectedAction
   | WSDisconnectedAction
   | OtherAction;

export interface OtherAction {
  type: ActionTypeKeys.OTHER_ACTION;
}

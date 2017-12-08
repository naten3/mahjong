import Axios, {AxiosResponse} from 'axios';

import { Action } from 'redux';

import { Weather, WsPayload, TokenResponse } from '../models';

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
  DEAL = 'DEAL',
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

export interface SignInAction extends PayloadAction<AxiosResponse<TokenResponse>> {
  type: ActionTypeKeys.SIGN_IN;
}

export interface SignOutAction extends Action<ActionTypeKeys> {
  type: ActionTypeKeys.SIGN_OUT;
}

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

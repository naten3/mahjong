import Axios, {AxiosResponse} from 'axios';

import { TokenResponse } from '../models'
import { ApiResponseAction, ActionTypeKeys, DrawAction, RequestGameStateAction } from './'
const API_BASE_URL: string = '/api'

  export function signIn(name: string): ApiResponseAction<TokenResponse> {
    const url = `${API_BASE_URL}/users?name=${name}`;
    const request: Promise<AxiosResponse<TokenResponse>> = Axios.get<TokenResponse>(url);
    return {
      type: ActionTypeKeys.SIGN_IN,
      payload: request
    }
  }

//TODO don't need action creator for this probably
  export function draw(token: string): DrawAction {
    return {
      type: ActionTypeKeys.DRAW,
      token
    }
  }

  export function requestGameState(token: string): RequestGameStateAction {
    return {
      type: ActionTypeKeys.REQUEST_GAME_STATE,
      token
    }
  }

import Axios, {AxiosResponse} from 'axios';

import { TokenResponse } from '../models'
import { ApiResponseAction, ActionTypeKeys } from './'
const API_BASE_URL: string = '/api'

  export function signIn(name: string): ApiResponseAction<TokenResponse> {
    const url = `${API_BASE_URL}/users?name=${name}`;
    const request: Promise<AxiosResponse<TokenResponse>> = Axios.get<TokenResponse>(url);
    return {
      type: ActionTypeKeys.SIGN_IN,
      payload: request
    }
  }

  export function draw(token: string): ApiResponseAction<TokenResponse>{
    const url = `${API_BASE_URL}/game/draw`;
    const request: Promise<AxiosResponse<any>> = Axios.get<any>(url, authHeaderOpt(token));
    return {
      type: ActionTypeKeys.DEAL,
      payload: request
    }
  }

  function authHeaderOpt(token: String) {
    return {headers: {Authorization: `Bearer ${token}`}}
  }

import {RxHttpRequest} from 'rx-http-request'

export * from './draw.epic';
export * from './request-game-state.epic'

//TODO https
export const API_BASE_URL: string =  `http://${location.hostname}${!!location.port ?  ':' + location.port : ''}/api`

export function baseRequest(token) {
  return RxHttpRequest.defaults({
    headers: {'Authorization': `Bearer {token}`}
  });
}

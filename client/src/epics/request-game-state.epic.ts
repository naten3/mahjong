import { } from 'rxjs';
import { Action } from 'redux';
import { Epic } from 'redux-observable';
import { RxHttpRequest } from 'rx-http-request';

import { API_BASE_URL } from './'
import {ActionTypeKeys, RequestGameStateAction} from '../actions'

export const requestGameStateEpic: Epic<Action, any> =
  (action$, store) => {
    const url = `${API_BASE_URL}/game/state`;
    return action$
      .filter(action => action.type == ActionTypeKeys.REQUEST_GAME_STATE)
      .flatMap(apiAction => {
        console.log("Making api request")
        let token = (apiAction as RequestGameStateAction).token;
        let headerString = `Bearer ${token}`

        return RxHttpRequest.defaults({
          headers: {'Authorization': headerString}
        }).get(url)
        .map(data => {
          if (data.response.statusCode === 200) {
            return {
              type: ActionTypeKeys.GAME_STATE_UPDATE,
              payload: JSON.parse(data.response.body)
            }
          } else {
            return {
              type: ActionTypeKeys.REQUEST_GAME_STATE_FAIL,
              message: data.message
            };
          }
        },
        err => {
          return {
            type: ActionTypeKeys.REQUEST_GAME_STATE_FAIL,
            message: err.message
          }
        })
      });
  }

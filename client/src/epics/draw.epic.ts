import { Action } from 'redux'
import { Epic } from 'redux-observable'

import { API_BASE_URL, baseRequest } from './'
import {ActionTypeKeys, DrawAction} from '../actions'

export const drawEpic: Epic<Action, any> =
  (action$, store) => {
    const url = `${API_BASE_URL}/game/draw`;
    return action$
      .filter(action => action.type == ActionTypeKeys.DRAW)
      .flatMap(apiAction => {
        console.log("Making api request")
        return baseRequest((apiAction as DrawAction).token).get(url)
        .map(data => {
          if (data.response.statusCode === 200) {
            return {type: ActionTypeKeys.DRAW_SUCCESS}
          } else {
            return {
              type: ActionTypeKeys.DRAW_FAIL,
              message: data.message
            };
          }
        },
        err => {
          return {
            type: ActionTypeKeys.DRAW_FAIL,
            message: err.message
          }
        })
      });
  }

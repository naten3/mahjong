import { } from 'redux'
import { ActionTypeKeys, ActionTypes } from '../actions';


export function authenticatedReduce(state: string | null | undefined, action: ActionTypes ): string | null {
  switch(action.type) {
  case ActionTypeKeys.SIGN_IN:
     sessionStorage.setItem('jwtToken', action.payload.data.token); //TODO very impure, local storage better
    return action.payload.data.token;
  case ActionTypeKeys.SIGN_OUT: //TODO this will never get dispatched
    sessionStorage.removeItem('jwtToken');
    return null
  default:
    if (typeof(state) == "undefined") {
      return sessionStorage.getItem('jwtToken');
    } else {
      return state;
    }
  }
}

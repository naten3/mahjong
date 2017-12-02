import { } from 'redux'
import { ActionTypeKeys, ActionTypes } from '../actions';


export function authenticatedReduce(state: string | null = null, action: ActionTypes ): string | null {
  switch(action.type) {
  case ActionTypeKeys.SIGN_IN:
    console.log(`completed promise ${action.payload.data.token}`);
    return action.payload.data.token;
  case ActionTypeKeys.SIGN_OUT: //TODO this will never get dispatched
    return null
  default:
    return state;
  }
}

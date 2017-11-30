import { } from 'redux'
import { Weather } from '../models'
import { ActionTypeKeys, ActionTypes } from '../actions';


export function weatherReduce(state: Weather[] = [], action: ActionTypes ): Weather[] {
  switch(action.type) {
  case ActionTypeKeys.FETCH_WEATHER:
    console.log(`completed promise ${action.payload.data.city.name}`);
    return [action.payload.data, ... state]
  default:
    return state;
  }
}

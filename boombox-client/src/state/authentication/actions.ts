import { ActionTypes } from '../constants';
import { Action } from 'redux';

export const JoinRoom = (): Action => ({
  type: ActionTypes.JoinRoom
});
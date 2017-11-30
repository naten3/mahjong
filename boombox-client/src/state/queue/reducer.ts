import { PayloadAction, ActionTypes } from './../constants';
import { Track } from '../../models';

export type State = Track[];

const initialState: State = [];

export default (state = initialState, action: PayloadAction) => {
  if (action.type === ActionTypes.UpdateQueue) {
    return action.payload;
  }
  return state;
};
import { Action } from 'redux';

export type State = {
  nickname: string;
};

const initialState: State = {
  nickname: 'test'
};

export default (state = initialState, action: Action) => {
  return state;
};
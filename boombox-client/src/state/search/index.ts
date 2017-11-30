
import * as SearchActions from './actions';
import reducer, { State as SearchState } from './reducer';
import SearchEpic from './epic';

export const Actions = SearchActions;
export const Epic = SearchEpic;
export type State = SearchState;
export default reducer;

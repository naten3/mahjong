
import * as AuthActions from './actions';
import reducer, { State as AuthState } from './reducer';
import AuthEpic from './epic';

export const Actions = AuthActions;
export const Epic = AuthEpic;
export type State = AuthState;
export default reducer;

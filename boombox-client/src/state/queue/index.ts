
import * as QueueActions from './actions';
import reducer, { State as QueueState } from './reducer';
import QueueEpic from './epic';

export const Actions = QueueActions;
export const Epic = QueueEpic;
export type State = QueueState;
export default reducer;

import { combineReducers, Reducer } from 'redux';
import { authenticatedReduce } from './authenticated.reducer';
import { websocketOpenReduce } from './websocket-open.reducer';
import { RootState } from '../models'

const rootReducer: Reducer<RootState> = combineReducers<any>({
    token: authenticatedReduce,
    websocketOpen: websocketOpenReduce
  });

export default rootReducer;

import { combineReducers, Reducer } from 'redux';
import { authenticatedReduce } from './authenticated.reducer';
import { websocketOpenReduce } from './websocket-open.reducer';
import { playersWaitingReducer } from './players-waiting.reducer';
import { gameStateReducer } from './game-state.reducer';
import { RootState } from '../models'

const rootReducer: Reducer<RootState> = combineReducers<any>({
    token: authenticatedReduce,
    websocketOpen: websocketOpenReduce,
    playersWaiting: playersWaitingReducer,
    gameState: gameStateReducer
  });

export default rootReducer;

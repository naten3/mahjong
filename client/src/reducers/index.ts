import { combineReducers, Reducer } from 'redux';
import { weatherReduce } from './weather.reducer';
import { RootState } from '../models'

const rootReducer: Reducer<RootState> = combineReducers<any>({
    weather: weatherReduce
  });

export default rootReducer;

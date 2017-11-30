import { createStore, combineReducers, applyMiddleware, Middleware } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import authReducer, {
  Actions as AuthActions,
  State as AuthState,
  Epic as AuthEpic
} from './authentication';

import searchReducer, {
  Actions as SearchActions,
  State as SearchState,
  Epic as SearchEpic
} from './search';

import queueReducer, {
  Actions as QueueActions,
  State as QueueState,
  Epic as QueueEpic
} from './queue';

export type RootState = {
  auth: AuthState,
  search: SearchState,
  queue: QueueState,
};

// All Actions
export const actions = {
  ...AuthActions,
  ...SearchActions,
  ...QueueActions
};

const epics = combineEpics(
  AuthEpic,
  SearchEpic,
  QueueEpic
);

const reducer = combineReducers({
  // Main reducers go here
  auth: authReducer,
  search: searchReducer,
  queue: queueReducer
});

const middleware = [
  createEpicMiddleware(epics),
] as Middleware[];

export default () => {
  return createStore(
    reducer,
    applyMiddleware(...middleware)
  );
};

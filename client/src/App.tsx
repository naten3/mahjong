import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BrowserRouter, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import * as ReduxPromise from 'redux-promise';
import { combineEpics, createEpicMiddleware } from 'redux-observable'

import Main from './containers/main';
import { socketMiddleware } from './middleware';
import { drawEpic, requestGameStateEpic } from './epics'

import rootReducer from './reducers';
import './common.css';

declare var process: any;
const env = process.env.NODE_ENV;


function _getUrl() {
  const loc = window.location;

  return `${loc.protocol}//${loc.host}/api/ws`;
}

const rootEpic = combineEpics(drawEpic, requestGameStateEpic);

const epicMiddleware = createEpicMiddleware(rootEpic);

const middlewares: any[] = [ReduxPromise, socketMiddleware(_getUrl()), epicMiddleware];

if (env === 'dev') {
  middlewares.push(createLogger());
}

const store = createStore(rootReducer, {}, applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={Main}/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('content')
);

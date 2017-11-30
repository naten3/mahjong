import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import * as ReduxPromise from 'redux-promise';

import Main from './containers/main';
import { socketMiddleware } from './middleware';

import rootReducer from './reducers';
import './common.css';

declare var process: any;
const env = process.env.NODE_ENV;


function _getUrl() {
  const loc = window.location;
  let protocol;
  if (loc.protocol === 'https:') {
    protocol = 'wss:';
  } else {
    protocol = 'ws:';
  }

  return `${protocol}//${loc.host}/ws`;
}


const middlewares: any[] = [ReduxPromise, socketMiddleware(_getUrl())];

if (env === 'dev') {
  middlewares.push(createLogger());
}

const store = createStore(rootReducer, {}, applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={Main}/>
    </Router>
  </Provider>,
  document.getElementById('content')
);

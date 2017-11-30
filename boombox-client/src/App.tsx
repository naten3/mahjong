import * as React from 'react';
import 'rxjs';
import 'typeface-roboto';
import { Provider } from 'react-redux';

import createStore from './state';
import { AuthGuard } from './components/pages';

const store = createStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AuthGuard />
      </Provider>
    );
  }
}

export default App;

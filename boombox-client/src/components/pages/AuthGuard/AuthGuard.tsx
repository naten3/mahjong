import * as React from 'react';
import PlaylistPage from '../PlaylistPage';
import LoginPage from '../LoginPage';

type State = {
  authenticated: string | null;
};

class AuthGuard extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.updateAuth = this.updateAuth.bind(this);

    this.state = {
      authenticated: localStorage.getItem('password')
    };
  }
  updateAuth() {
    this.setState({
      authenticated: localStorage.getItem('password')
    });
  }
  render () {
    return (
      <div>
        { this.state.authenticated ?
          <PlaylistPage /> :
          <LoginPage pingAuthentication={this.updateAuth} /> }
      </div>
    );
  }
}

export default AuthGuard;

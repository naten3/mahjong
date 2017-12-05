import { Component, FormEvent } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { TokenResponse, RootState } from '../models'
import { ApiResponseAction } from '../actions';
import { signIn } from '../actions/action-creators'

class Join extends Component<JoinProps, JoinState> {

  constructor(props) {
    super(props);
    this.state = { name : ''}

    this.onInputChange=this.onInputChange.bind(this);
    this.onFormSubmit=this.onFormSubmit.bind(this);
  }

  public onInputChange(event: FormEvent<HTMLInputElement>) {
    this.setState({ name: event.currentTarget.value });
  }

  public onFormSubmit(event: FormEvent<any>) {
    event.preventDefault();
    this.props.signIn(this.state.name);
    this.setState({name : ''});
  }

  public render() {
    return (
      <form
      className="input-group"
      onSubmit={this.onFormSubmit}>
        <input placeholder="Enter your name to join the game!"
        className="form-control"
        value={this.state.name}
        onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>

        {this.authenticationMessage(!!this.props.token)}
      </form>
    );
  }

  private authenticationMessage(authenticated: boolean) {
    if (this.props.token) {
    return <span> AUTHENTICATED!!! </span>;
  } else {
    return <span> NOT AUTHENTICATED!!! </span>;
  }
  }
}

function mapStateToProps(state: RootState): JoinMapProps {
  return { token: state.token }
}

function mapDispatchToProps(dispatch: Dispatch<any>): JoinDispProps  {
  // Wraps selectBook in a call to dispatch
  return bindActionCreators({ signIn }, dispatch);
}

// @ts-ignore: 2nd arg is an object of action creators wrapped in dispatch calls
export default connect(mapStateToProps, mapDispatchToProps)(Join);


export interface JoinMapProps {
  token: string | undefined;
}

export interface JoinDispProps {
  signIn: (string) => ApiResponseAction<TokenResponse>
};
export type JoinProps =
    JoinMapProps & JoinDispProps;

export interface JoinState {
  name: string;
}

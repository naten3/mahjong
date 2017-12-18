import { Component, FormEvent } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Redirect } from 'react-router-dom'

import { TokenResponse, RootState, UserFacingGameStateType } from '../models'
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
    if (this.props.token && this.props.gameStarted) {
      return <Redirect to='/active-game'/>;
    } else {
      if (!this.props.websocketOpen || !this.props.token) {
        return this.nameMessage();
      } else {
        //TODO maybe another route when I have internet to research
        return this.waitingForPlayers(this.props.playersWaiting);
      }
    }
  }

  private nameMessage() {
    return (<form
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
    </form>)
  }

  private waitingForPlayers(playersWaiting) {
    return (<div>Welcome! Waiting for Players. Currently {playersWaiting} Players</div>
    )
  }

}

function mapStateToProps(state: RootState): JoinMapProps {
  return { token: state.token,
    websocketOpen: state.websocketOpen,
     playersWaiting: state.playersWaiting,
     gameStarted: state.gameState.type == UserFacingGameStateType.ACTIVE }
}

function mapDispatchToProps(dispatch: Dispatch<any>): JoinDispProps  {
  return bindActionCreators({ signIn }, dispatch);
}

// @ts-ignore: 2nd arg is an object of action creators wrapped in dispatch calls
export default connect(mapStateToProps, mapDispatchToProps)(Join);

export interface JoinMapProps {
  token: string | undefined;
  websocketOpen: boolean;
  playersWaiting: number;
  gameStarted: boolean;
}

export interface JoinDispProps {
  signIn: (string) => ApiResponseAction<TokenResponse>
};
export type JoinProps =
    JoinMapProps & JoinDispProps;

export interface JoinState {
  name: string;
}

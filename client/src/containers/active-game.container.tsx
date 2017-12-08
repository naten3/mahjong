import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Redirect } from 'react-router-dom'

import { RootState, UserFacingGameState } from '../models'
import MyHand from './my-hand.container'
import { ApiResponseAction } from '../actions';
import { draw } from '../actions/action-creators'

class ActiveGame extends Component<ActiveGameProps, ActiveGameState> {

  public render() {
    if (!this.props.gameState || !this.props.token) {
      return <Redirect to='/'/>;
    } else {
      let token: string = this.props.token;
      return (
        <div id="board">
          <div id="player-section">
            <MyHand />
            <button onClick={() => this.props.draw(token)}>
             Draw
            </button>
          </div>
        </div>)
    }
  }
}

function mapStateToProps(state: RootState): ActiveGameMapProps {
  return { gameState: state.gameState,
    token: state.token }
}

function mapDispatchToProps(dispatch: Dispatch<any>): ActiveGameDispProps  {
  return bindActionCreators({ draw }, dispatch);
}

// @ts-ignore: 2nd arg is an object of action creators wrapped in dispatch calls
export default connect(mapStateToProps, mapDispatchToProps)(ActiveGame);


export interface ActiveGameMapProps {
  gameState?: UserFacingGameState,
  token? : string
}

export interface ActiveGameDispProps {
  draw: (string) => ApiResponseAction<any>
};

export type ActiveGameProps =
    ActiveGameMapProps & ActiveGameDispProps;

export interface ActiveGameState {
}

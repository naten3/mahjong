import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Redirect } from 'react-router-dom'

import { RootState, UserFacingGameState, UserFacingActiveGameState,
   UserFacingGameStateType } from '../models'
import MyHand from './my-hand.container'
import { ApiResponseAction } from '../actions';
import { draw } from '../actions/action-creators'

class ActiveGame extends Component<ActiveGameProps, ActiveGameState> {

  constructor(props) {
    super(props);
  }

  public render() {
    if (!this.props.gameState || !this.props.token) {
      return <Redirect to='/'/>;
    } else {
      let token: string = this.props.token;
      //TODO put buttons in own container
      return (
        <div id="board">
          <div id="player-section">
            <MyHand />
            <div id="button-bar" >
              <div style={{visibility: this.props.myTurn ? 'visible' : 'hidden' }}>
                <button onClick={() => this.props.draw(token)} className="btn btn-primary">
                 Draw
                 </button>
               </div>
            </div>
          </div>
        </div>)
    }
  }
}

function mapStateToProps(state: RootState): ActiveGameMapProps {
  let myTurn = false;
  if (state.gameState && state.gameState.type == UserFacingGameStateType.ACTIVE) {
    let gameState = state.gameState as UserFacingActiveGameState;
    myTurn = gameState.currentTurn == gameState.myPosition;
  }
  return { gameState: state.gameState,
    token: state.token,
    myTurn: myTurn}
}

function mapDispatchToProps(dispatch: Dispatch<any>): ActiveGameDispProps  {
  return bindActionCreators({ draw }, dispatch);
}

// @ts-ignore: 2nd arg is an object of action creators wrapped in dispatch calls
export default connect(mapStateToProps, mapDispatchToProps)(ActiveGame);


export interface ActiveGameMapProps {
  gameState?: UserFacingGameState,
  token?: string,
  myTurn: boolean
}

export interface ActiveGameDispProps {
  draw: (string) => ApiResponseAction<any>
};

export type ActiveGameProps =
    ActiveGameMapProps & ActiveGameDispProps;

export interface ActiveGameState {
}

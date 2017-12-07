import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Redirect } from 'react-router-dom'

import { RootState, UserFacingGameState } from '../models'
import MyHand from './my-hand.container'
import {  } from '../actions';
import {  } from '../actions/action-creators'

class ActiveGame extends Component<ActiveGameProps, ActiveGameState> {

  public render() {
    if (!this.props.gameState) {
      return <Redirect to='/'/>;
    }
    return <div id="board"> <MyHand /> </div>
  }

}

function mapStateToProps(state: RootState): ActiveGameMapProps {
  return { gameState: state.gameState }
}

function mapDispatchToProps(dispatch: Dispatch<any>): ActiveGameDispProps  {
  return bindActionCreators({ }, dispatch);
}

// @ts-ignore: 2nd arg is an object of action creators wrapped in dispatch calls
export default connect(mapStateToProps, mapDispatchToProps)(ActiveGame);


export interface ActiveGameMapProps {
  gameState?: UserFacingGameState
}

export interface ActiveGameDispProps {
};

export type ActiveGameProps =
    ActiveGameMapProps & ActiveGameDispProps;

export interface ActiveGameState {
}

import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Redirect } from 'react-router-dom'

import { RootState, UserFacingGameState,
  UserFacingGameStateType, UserFacingActiveGameState, Tile } from '../models'
import { TileComponent } from '../components';
import {  } from '../actions';
import {  } from '../actions/action-creators'

class MyHand extends Component<MyHandProps, null> {

  public render() {
    if (!this.props.gameState) {
      return <Redirect to='/'/>;
    } else if (this.props.gameState.type == UserFacingGameStateType.ACTIVE) {
      let agt = this.props.gameState as UserFacingActiveGameState;
      return (
        <div id="my-hand">
          <div id="free-tiles">
            {this.freeTiles(agt.userHand.freeTiles)}
          </div>
        </div>)
    } else {
      //TODO
      return <div />;
    }
  }

  private freeTiles(tiles: Array<Tile>) {
    return tiles.map( t => this.tileComponent(t))
  }

  private tileComponent(t: Tile) {
    return (<TileComponent key={t.id} tile={t}/>);
  }

}

function mapStateToProps(state: RootState): MyHandMapProps {
  return { gameState: state.gameState }
}

function mapDispatchToProps(dispatch: Dispatch<any>): MyHandDispProps  {
  return bindActionCreators({ }, dispatch);
}

// @ts-ignore: 2nd arg is an object of action creators wrapped in dispatch calls
export default connect(mapStateToProps, mapDispatchToProps)(MyHand);


export interface MyHandMapProps {
  gameState?: UserFacingGameState
}

export interface MyHandDispProps {
};

export type MyHandProps =
    MyHandMapProps & MyHandDispProps;

import * as React from 'react';
import { Dispatch, bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Join from './join.container';
// import * as _ from 'lodash';

import { RootState } from '../models';
import { WSConnectAction, ActionTypeKeys } from '../actions';

class Main extends React.Component<MainProps, any> {

  public render() {
    if (this.props.token && !this.props.websocketOpen) {
      console.log("websocket is not open, connecting")
      this.props.websocketConnect(this.props.token);
    }

    return (
      <div>
         <Join />
      </div>
    );
  }
}

function websocketConnect(token: string): WSConnectAction {
  return {type: ActionTypeKeys.WS_CONNECT, payload: token};
}

function mapStateToProps(state: RootState) {
  return { token: state.token, websocketOpen: state.websocketOpen };
}

function mapDispatchToProps(dispatch: Dispatch<any>): MainDispProps  {
  return bindActionCreators({ websocketConnect }, dispatch);
}

 // @ts-ignore: first arg needs to be optional, type bug
export default connect(mapStateToProps, mapDispatchToProps)(Main);

export interface MainMapProps {
  token?: string,
  websocketOpen: boolean
}
export interface MainDispProps {
  websocketConnect: (string) => WSConnectAction;
};
export type MainProps =
    MainMapProps & MainDispProps;

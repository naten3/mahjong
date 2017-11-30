import * as React from 'react';
import { Dispatch, bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import SearchBar from './search_bar.container';
import WeatherList from './weather_list.container';
// import * as _ from 'lodash';

import { } from '../models';
import { WSConnectAction, ActionTypeKeys } from '../actions';

class Main extends React.Component<MainProps, any> {

  public render() {
    this.props.websocketConnect();

    return (
      <div>
         <SearchBar />
         <WeatherList />
      </div>
    );
  }
}

function websocketConnect(): WSConnectAction {
  return {type: ActionTypeKeys.WS_CONNECT, payload: 'nate'};
}



function mapDispatchToProps(dispatch: Dispatch<any>): MainDispProps  {
  return bindActionCreators({ websocketConnect }, dispatch);
}

 // @ts-ignore: first arg needs to be optional, type bug
export default connect(null, mapDispatchToProps)(Main);

export interface MainMapProps {
}
export interface MainDispProps {
  websocketConnect: () => WSConnectAction;
};
export type MainProps =
    MainMapProps & MainDispProps;

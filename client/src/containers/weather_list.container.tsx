import { Component } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { } from 'redux';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import * as _ from 'lodash';

import { Weather, ForecastSnapshot } from '../models'
import {  } from '../actions';

class WeatherListContainer extends Component<WeatherListProps, any> {

  constructor(props) {
    super(props);
    this.state = { term: ''}
  }

  private renderWeather(weather: Weather) {
    const sortedSnapshots: Array<ForecastSnapshot> = _.orderBy(weather.list, ['dt']);
    return (
    <tr key={weather.city.id}>
      <td>{weather.city.name}</td>
      {this.renderWeatherGraph(sortedSnapshots.map( s => s.main.temp), 'red')}
      {this.renderWeatherGraph(sortedSnapshots.map( s => s.main.pressure), 'green')}
      {this.renderWeatherGraph(sortedSnapshots.map( s => s.main.humidity), 'blue')}
    </tr>);
  }

  private renderWeatherGraph(data: Array<number>, color: String) {
    const average = _.round(_.sum(data)/data.length);
    return (
      <td>
      <Sparklines data={data} height={120} width={180} >
        <SparklinesLine color={color}/>
        <SparklinesReferenceLine type="avg" />
      </Sparklines>
      <div>{average}</div>
      </td>);
  }

  public render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>Pressure</th>
            <th>Humidity</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(weather => this.renderWeather(weather) )}
        </tbody>
      </table>
    );
  }
}

//function mapStateToProps( rootState: RootState) {
//  return {weather: []};
//}
// @ts-ignore: 2nd arg is an object of action creators wrapped in dispatch calls
export default connect(null)(WeatherListContainer);


export interface WeatherListMapProps {
  weather: Array<Weather>
}
export interface WeatherListDispProps {
};
export type WeatherListProps =
    WeatherListMapProps & WeatherListDispProps;

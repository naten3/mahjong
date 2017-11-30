import { Component, FormEvent } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {AxiosResponse} from 'axios';

import { Weather } from '../models'
import { fetchWeather, FetchWeatherAction, PromiseAction } from '../actions';

class SearchBarContainer extends Component<SearchBarProps, SearchBarState> {

  constructor(props) {
    super(props);
    this.state = { term: ''}

    this.onInputChange=this.onInputChange.bind(this);
    this.onFormSubmit=this.onFormSubmit.bind(this);
  }

  public onInputChange(event: FormEvent<HTMLInputElement>) {
    this.setState({ term: event.currentTarget.value });
  }

  public onFormSubmit(event: FormEvent<any>) {
    event.preventDefault();
    this.props.fetchWeather(this.state.term);
    this.setState({term: ''});
  }

  public render() {
    return (
      <form
      className="input-group"
      onSubmit={this.onFormSubmit}>
        <input placeholder="Get a five day forecast in your favorite cities"
        className="form-control"
        value={this.state.term}
        onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>): SearchBarDispProps  {
  // Wraps selectBook in a call to dispatch
  return bindActionCreators({ fetchWeather }, dispatch);
}

// @ts-ignore: 2nd arg is an object of action creators wrapped in dispatch calls
export default connect(null, mapDispatchToProps)(SearchBarContainer);


export interface SearchBarMapProps {
}
export interface SearchBarDispProps {
  fetchWeather: (string) => PromiseAction<AxiosResponse<Weather>, FetchWeatherAction>
};
export type SearchBarProps =
    SearchBarMapProps & SearchBarDispProps;

export interface SearchBarState {
  term: string;
}

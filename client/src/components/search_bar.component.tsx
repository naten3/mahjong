import {Component, FormEvent } from 'react';
import * as React from 'react';

export class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: any) {
    super(props);

    this.state = { term: '' }
    this.onInputChange = this.onInputChange.bind(this);
  }

  public render() {
    return (
      <div className="search-bar">
        <input
        value={this.state.term}
        onChange={this.onInputChange} />
      </div>
    );
  }

  public onInputChange(event: FormEvent<HTMLInputElement>) {
    let term: string = event.currentTarget.value;
    this.setState( new SearchBarState(term));
    this.props.onSearchTermChange(term);
  }
}

class SearchBarState {

  term: string;

  constructor(term: string) {
    this.term = term;
  }
}

interface SearchBarProps {
  onSearchTermChange(term: string);
}

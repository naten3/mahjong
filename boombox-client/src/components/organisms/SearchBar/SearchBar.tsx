import * as React from 'react';
import { throttle } from 'lodash-es';
import { TextField } from 'material-ui';

type Props = {
  handleChange: (a: string) => void;
};
class SearchBar extends React.Component<Props, {}> {
  throttleChange: ((a: string) => void) & _.Cancelable;

  constructor(props: Props) {
    super(props);
    this.throttleChange = throttle(
      this.props.handleChange,
      1000,
      { trailing: true, leading: false }
    );
  }

  render () {
    return (
      <div>
        <TextField
          fullWidth={true}
          label="Search for songs"
          placeholder="Search for songs"
          helperText="Try being specific"
          margin="normal"
          onChange={(event) => this.throttleChange(event.target.value)}
        />
      </div>
    );
  }
}

export default SearchBar;

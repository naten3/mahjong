import { connect } from 'react-redux';
import { actions } from '../../../state';

import SearchBar from './SearchBar';

export default connect(
  undefined,
  (dispatch) => ({
    handleChange(search: string) {
      if (search !== '') {
        dispatch(actions.RequestSearchResults(search));
      }
    }
  })
)(SearchBar);

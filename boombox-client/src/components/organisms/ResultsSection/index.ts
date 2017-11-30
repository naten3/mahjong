import { connect } from 'react-redux';
import { getSearchedTracks } from '../../../state/selectors';
import ResultsSection from './ResultsSection';

export default connect(
  (state) => ({
    tracks: getSearchedTracks(state)
  })
)(ResultsSection);

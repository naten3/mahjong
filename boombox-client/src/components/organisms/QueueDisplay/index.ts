import { connect } from 'react-redux';
import { getQueueTracks } from '../../../state/selectors';
import { actions } from '../../../state';
import QueueDisplay from './QueueDisplay';
import { Track } from '../../../models';

export default connect<{tracks: Track[], classes: {}}, {requestQueue: () => void}, {}>(
  (state) => ({
    tracks: getQueueTracks(state),
    classes: {}
  }),
  (dispatch) => ({
    requestQueue() {
      dispatch(actions.RequestQueue());
    }
  })
)(QueueDisplay);

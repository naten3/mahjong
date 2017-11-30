import { connect } from 'react-redux';
import { actions } from '../../../state';
import { Track } from '../../../models';
import TrackCard from './TrackCard';

export default connect<{}, {addToQueue: () => void}, {track: Track}>(
  undefined,
  (dispatch, ownProps) => ({
    addToQueue() {
      // Do Something
      dispatch(actions.AddTrackToQueue(ownProps.track));
    }
  })
)(TrackCard);

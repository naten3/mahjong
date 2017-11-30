import * as React from 'react';
import { Grid } from 'material-ui';

import { Track } from '../../../models';
import { TrackCard } from '../../molecules';

type Props = {
  tracks: Track[];
};
class ResultsSection extends React.Component<Props, {}> {
  render () {
    return (
      <Grid container={true} direction="row">
        {this.props.tracks.map(
          track => (
            <Grid key={track.id} item={true} xs={12} sm={3}>
              <TrackCard track={track} />
            </Grid>
          )
        )}
      </Grid>
    );
  }
}

export default ResultsSection;

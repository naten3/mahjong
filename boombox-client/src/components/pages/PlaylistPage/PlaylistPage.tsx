import * as React from 'react';
import { Grid } from 'material-ui';
import {
  QueueDisplay,
  ResultsSection,
  SearchBar
} from '../../organisms';
class PlaylistPage extends React.Component {
  render () {
    return (
      <Grid container={true} direction={'column'} justify={'flex-start'}>
        <Grid item={true} xs={12}>
          <QueueDisplay />
        </Grid>
        <Grid item={true} xs={12}>
          <SearchBar />
        </Grid>
        <Grid item={true} xs={12}>
          <ResultsSection />
        </Grid>
      </Grid>
    );
  }
}

export default PlaylistPage;

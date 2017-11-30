import * as React from 'react';
import { Track } from '../../../models';
import { Card, CardHeader, Avatar, CardActions, IconButton } from 'material-ui';
import QueueIcon from 'material-ui-icons/Queue';

type Props = {
  track: Track;
  addToQueue: () => void;
};
class TrackCard extends React.Component<Props, {}> {
  render () {
    const {
      track
    } = this.props;
    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar
              aria-label="Album Image"
              src={track.album.images[0].url}
            />
          }
          title={track.name}
          subheader={track.artists.map(artist => artist.name).join(', ')}
        />
        <CardActions>
          <IconButton
            onClick={this.props.addToQueue}
            aria-label="Add to queue"
          >
            <QueueIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default TrackCard;

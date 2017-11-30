import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ThumbUpIcon from 'material-ui-icons/ThumbUp';
import { Track } from '../../../models';
import { CSSProperties } from 'react';
import { Typography } from 'material-ui';

// tslint:disable-next-line:no-any
const styles = (theme: any) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
    height: 200
  },
  gridList: {
    width: '100%',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: 'white',
  },
  titleBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

type Props = {
  tracks: Track[];
  requestQueue: () => void;
  // tslint:disable-next-line:no-any
  classes: any;
};

const getColumns = (): number => {
  const width = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;
  return width / 200.0;
};

class QueueDisplay extends React.Component<Props, {}> {
  // tslint:disable-next-line:no-any
  resize: any;
  // tslint:disable-next-line:no-any
  queuePing: any;

  componentDidMount () {
    this.queuePing = setInterval(
      () => this.props.requestQueue(),
      2500
    );
    this.resize = window.addEventListener('resize', (e) => {
      this.forceUpdate();
    });
  }
  
  componentWillUnmount () {
    clearInterval(this.queuePing);
    removeEventListener(this.resize);
  }
  
  render() {
    const { classes, tracks } = this.props;
  
    if (tracks.length === 0) {
      return (
        <div className={classes.root} style={{ height: 140, textAlign: 'center', paddingTop: 60 }}>
          <Typography type={'headline'}>No songs in queue</Typography>
        </div>
      );
    }
  
    return (
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={getColumns()} cellHeight={200}>
          {tracks.map(track => (
            <GridListTile key={track.id}>
              <img src={track.album.images[0].url} alt={track.name} height={200}/>
              <GridListTileBar
                title={track.name}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
                actionIcon={
                  <IconButton>
                    <ThumbUpIcon className={classes.title} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default withStyles(styles as Partial<CSSProperties>)(QueueDisplay);
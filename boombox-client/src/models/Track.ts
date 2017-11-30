import Album from './Album';
import Artist from './Artist';

export default interface Track {
  album: Album;
  artists: Artist[];
  name: string;
  id: string;
  uri: string;
  popularity: number;
  // tslint:disable-next-line:variable-name
  available_markets: string[];
  explicit: boolean;
  // tslint:disable-next-line:variable-name
  duration_ms: number;
}
import Image from './Image';
import Artist from './Artist';

export default interface Album {
  artists: Artist[];
  name: string;
  images: Image[];
  uri: string;
}

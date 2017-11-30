import { Observable } from 'rxjs/Observable';
import HttpService from './https';
import endpoints from './endpoints';
import { Track } from '../models';

class QueueService {
  static addToQueue(track: Track): Observable<boolean> {
    return HttpService.put(endpoints.queue.main, { track: track, username: localStorage.getItem('nickname') })
      .map(res => res.status === 204);
  }

  static getQueue(): Observable<Track[]> {
    return HttpService.get(endpoints.queue.main)
      .map(res => res.response);
  }
}

export default QueueService;

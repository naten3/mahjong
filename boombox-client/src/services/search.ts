import { Observable } from 'rxjs/Observable';
import HttpService from './https';
import endpoints from './endpoints';
import { Track } from '../models';

type SearchResults = {
  tracks: Track[];
};
class SearchService {
  static SearchAll(searchString: string): Observable<SearchResults> {
    return HttpService.get(endpoints.search.bulk, { query: searchString })
      .map(res => res.response);
  }
}

export default SearchService;

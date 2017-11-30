import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { Store, Action } from 'redux';

import { SearchService } from '../../services';
import { ActionTypes, PayloadAction } from '../constants';
import { RootState } from '../index';

import * as SearchActions from './actions';

const requestSearchResults = (action$: Observable<Action>, store: Store<RootState>): Observable<Action> =>
  action$.filter(action => action.type === ActionTypes.RequestSearch)
    .map((action: PayloadAction) => action)
    .switchMap((action) => {
      return SearchService.SearchAll(action.payload)
        .map(res => SearchActions.UpdateSearchResults(res.tracks));
    });

export default combineEpics(
  requestSearchResults
);

import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { Store, Action } from 'redux';

import { QueueService } from '../../services';
import * as QueueActions from './actions';
import { ActionTypes, PayloadAction } from '../constants';
import { RootState } from '../index';

const addTrackToQueue = (action$: Observable<Action>, store: Store<RootState>): Observable<Action> =>
  action$.filter(action => action.type === ActionTypes.AddTrack)
    .map((action: PayloadAction) => action)
    .switchMap((action) => {
      return QueueService.addToQueue(action.payload)
        .map(res => {
          return QueueActions.RequestQueue();
        });
    });

const requestQueue = (action$: Observable<Action>, store: Store<RootState>): Observable<Action> =>
  action$.filter(action => action.type === ActionTypes.RequestQueue)
    .map((action: PayloadAction) => action)
    .switchMap((action) => {
      return QueueService.getQueue()
        .map(res => {
          return QueueActions.UpdateQueue(res);
        });
    });

export default combineEpics(
  addTrackToQueue,
  requestQueue
);

import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { Store, Action } from 'redux';

import { ActionTypes } from '../constants';
import { RootState } from '../index';

const joinRoom = (action$: Observable<Action>, store: Store<RootState>): Observable<Action> =>
  action$.filter(action => action.type === ActionTypes.JoinRoom)
    .map((action: Action) => action)
    .switchMap((action) => {
      return Observable.of({
        type: ActionTypes.DummyAction
      });
    });

export default combineEpics(
  joinRoom
);

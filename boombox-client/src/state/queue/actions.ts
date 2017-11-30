import { Action } from 'redux';
import { ActionTypes, PayloadAction } from '../constants';
import { Track } from '../../models';

export const AddTrackToQueue = (track: Track): PayloadAction => ({
  type: ActionTypes.AddTrack,
  payload: track
});

export const RequestQueue = (): Action => ({
  type: ActionTypes.RequestQueue,
});

export const UpdateQueue = (tracks: Track[]): PayloadAction => ({
  type: ActionTypes.UpdateQueue,
  payload: tracks
});

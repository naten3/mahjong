import { ActionTypes, PayloadAction } from '../constants';
import { Track } from '../../models';

export const RequestSearchResults = (payload: string): PayloadAction => ({
  type: ActionTypes.RequestSearch,
  payload
});

export const UpdateSearchResults = (payload: Track[]): PayloadAction => ({
  type: ActionTypes.UpdateSearch,
  payload
});

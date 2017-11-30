import { RootState } from './index';

export const selector = (state: RootState) => state.auth;
export const getSearchedTracks = (state: RootState) => state.search;
export const getQueueTracks = (state: RootState) => state.queue;

export enum ActionTypes {
  // Fake action
  DummyAction = 'DUMMY',
  // Action Types go here
  // Auth
  JoinRoom = 'Join room',
  // Search
  RequestSearch = 'Request search',
  UpdateSearch = 'Update search',
  // Queue
  AddTrack = 'Add To Queue',
  RequestQueue = 'Request Queue',
  UpdateQueue = 'Update Queue',
}

export const DummyAction = {
  type: ActionTypes.DummyAction
};

export interface PayloadAction {
  type: string;
  // tslint:disable-next-line:no-any
  payload: any;
}

import {Map} from 'immutable';

const ACTION_TYPES = {
  NAVIGATE: 'NAVIGATE'
};

export function navigate(view, threadID) {
  return {
    type: ACTION_TYPES.NAVIGATE,
    payload: {
      view,
      threadID
    }
  };
}

export const VIEWS = {
  INDEX_VIEW: 'INDEX_VIEW',
  THREAD_VIEW: 'THREAD_VIEW'
};

const initialState = Map({
  currentView: VIEWS.INDEX_VIEW
});

export default function NavigationStateReducer(state = initialState, action = {}) {
  if (action.type === ACTION_TYPES.NAVIGATE) {
    return state
      .set('currentView', action.payload.view)
      .set('threadID', action.payload.threadID);
  }
  return state;
}

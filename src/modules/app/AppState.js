import {Map} from 'immutable';

const ACTION_TYPES = {
  NAVIGATION: 'NAVIGATION'
};

export function navigate(target) {
  return {
    type: ACTION_TYPES.NAVIGATION,
    payload: target
  };
}

export const NAVIGATION = {
  INDEX_VIEW: 'INDEX_VIEW',
  THREAD_VIEW: 'THREAD_VIEW'
};

const initialState = Map({
  currentView: NAVIGATION.INDEX_VIEW
});

export default function AppStateReducer(state = initialState, action = {}) {
  if (action.type === ACTION_TYPES.NAVIGATION) {
    return state.set('currentView', action.payload);
  }
  return state;
}

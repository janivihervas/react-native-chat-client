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
  THREAD_LIST: 'thread list'
};

const initialState = Map({
  currentView: NAVIGATION.THREAD_LIST
});

export default function AppStateReducer(state = initialState, action = {}) {
  if (action.type === ACTION_TYPES.NAVIGATION) {
    return state.set('currentView', action.payload);
  }
  return state;
}

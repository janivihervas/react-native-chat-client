import {fromJS, Map} from 'immutable';

const ACTION_TYPES = {
  NAVIGATION: 'NAVIGATION'
};

export function navigate(view, id) {
  return {
    type: ACTION_TYPES.NAVIGATION,
    payload: Map({
      view,
      id
    })
  };
}

export const NAVIGATION = {
  INDEX_VIEW: 'INDEX_VIEW',
  THREAD_VIEW: 'THREAD_VIEW'
};

const initialState = fromJS({
  currentView: {
    view: NAVIGATION.INDEX_VIEW
  },
  currentUser: {
    id: '0',
    name: 'Current User'
  }
});

export default function AppStateReducer(state = initialState, action = {}) {
  if (action.type === ACTION_TYPES.NAVIGATION) {
    return state.set('currentView', action.payload);
  }
  return state;
}

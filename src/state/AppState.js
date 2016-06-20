import {fromJS} from 'immutable';

const initialState = fromJS({
  currentUser: {
    id: '0',
    name: 'Current User'
  }
});

export default function AppStateReducer(state = initialState) {
  return state;
}

import {fromJS} from 'immutable';

const initialState = fromJS({
  threads: []
});

export default function ThreadsStateReducer(state = initialState) {
  return state;
}

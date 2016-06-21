import {fromJS} from 'immutable';
import {loop, Effects} from 'redux-loop';

import * as mockServer from './mockServer';

const ACTION_TYPES = {
  FETCH_THREADS: 'FETCH_THREADS',
  FETCHING_DONE: 'FETCHING_DONE',
  FETCHING_ERROR: 'FETCHING_ERROR'
};

export function fetchThreads(user) {
  return {
    type: ACTION_TYPES.FETCH_THREADS,
    payload: user
  };
}

export function fetchThreadsFromAPI(user) {
  return mockServer.fetchThreads(user)
    .then(threads => ({
      type: ACTION_TYPES.FETCHING_DONE,
      payload: threads
    }))
    .catch(error => ({
      type: ACTION_TYPES.FETCHING_ERROR,
      payload: error
    }));
}

const initialState = fromJS({
  threadsFetched: false,
  fetching: false,
  threads: [],
  fetchingError: ''
});

export default function ThreadsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_THREADS: {
      return loop(
        state.set('fetching', true),
        Effects.promise(fetchThreadsFromAPI, action.payload)
      );
    }
    case ACTION_TYPES.FETCHING_DONE: {
      return state
        .set('fetching', false)
        .set('threadsFetched', true)
        .set('threads', fromJS(action.payload))
        .update('threads', threads =>
          threads.map(thread =>
            thread.set('lastMessage', thread.get('messages').last())
          )
        );
    }
    case ACTION_TYPES.FETCHING_ERROR: {
      return state
        .set('fetching', false)
        .set('fetchingError', fromJS(action.payload));
    }
    default: {
      return state;
    }
  }
}

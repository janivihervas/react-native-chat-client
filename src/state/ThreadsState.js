import {fromJS, Map} from 'immutable';
import {loop, Effects} from 'redux-loop';

import * as mockServer from './mockServer';

const ACTION_TYPES = {
  FETCH_THREADS: 'FETCH_THREADS',
  THREADS_UPDATED: 'THREADS_UPDATED',
  FETCHING_ERROR: 'FETCHING_ERROR',
  NEW_MESSAGE: 'NEW_MESSAGE'
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
      type: ACTION_TYPES.THREADS_UPDATED,
      payload: threads
    }))
    .catch(error => ({
      type: ACTION_TYPES.FETCHING_ERROR,
      payload: error
    }));
}

export function newMessage(threadID, author, text) {
  return {
    type: ACTION_TYPES.NEW_MESSAGE,
    payload: {
      threadID,
      author,
      text
    }
  };
}

const initialState = fromJS({
  threadsFetched: false,
  fetching: false,
  threads: [],
  fetchingError: ''
});

function ThreadStateReducer(state = Map(), action = {}) {
  switch (action.type) {
    case ACTION_TYPES.NEW_MESSAGE: {
      if (state.get('id') === action.payload.threadID) {
        return state.update('messages', messages => messages.push(Map({
          time: Date.now(),
          author: action.payload.author,
          text: action.payload.text
        })));
      }
      return state;
    }
    default: {
      return state;
    }
  }
}

export default function ThreadsStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTION_TYPES.FETCH_THREADS: {
      return loop(
        state.set('fetching', true),
        Effects.promise(fetchThreadsFromAPI, action.payload)
      );
    }
    case ACTION_TYPES.THREADS_UPDATED: {
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
    case ACTION_TYPES.NEW_MESSAGE: {
      return state.update('threads', threads =>
        threads
          .map(thread => ThreadStateReducer(thread, action))
          .map(thread =>
            thread.set('lastMessage', thread.get('messages').last())
          )
      );
    }
    default: {
      return state;
    }
  }
}

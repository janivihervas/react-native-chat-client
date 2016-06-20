import {describe, it, beforeEach} from 'mocha';
import {assert} from 'chai';
import {loop, Effects} from 'redux-loop';
import {Map, fromJS} from 'immutable';
import rewire from 'rewire';

import ThreadsStateReducer, {
  fetchThreads,
  fetchThreadsFromAPI
} from '../../src/state/ThreadsState';

const mockThreadsStateReducer = rewire('../../src/state/ThreadsState');

describe('ThreadsState', () => {
  let initialState;

  beforeEach(() => {
    initialState = ThreadsStateReducer();
  });

  it('ThreadsStateReducer', () => {
    assert.isOk(initialState);
    assert.equal(initialState.get('threadsFetched'), false);
    assert.equal(initialState.get('fetching'), false);
    assert.isArray(initialState.get('threads').toJS());

    assert.equal(initialState, ThreadsStateReducer());
    assert.equal(ThreadsStateReducer(1, {type: 'weiufbef'}), 1);
  });

  it('fetchThreads', () => {
    const action = fetchThreads('test');

    assert.isObject(action);
    assert.isString(action.type);
    assert.equal(action.payload, 'test');

  });

  it('FETCH_THREADS', () => {
    const action = fetchThreads('test');
    const state = Map();
    assert.deepEqual(
      ThreadsStateReducer(state, action),
      loop(
        state.set('fetching', true),
        Effects.promise(fetchThreadsFromAPI, action.payload)
      )
    );
  });

  it('FETCHING_DONE', () => {
    const action = {
      type: 'FETCHING_DONE',
      payload: ['test', 'asdasd']
    };
    const state = Map();
    assert.deepEqual(
      ThreadsStateReducer(state, action),
      state
        .set('fetching', false)
        .set('threadsFetched', true)
        .set('threads', fromJS(action.payload))
    );
  });

  it('FETCHING_ERROR', () => {
    const action = {
      type: 'FETCHING_ERROR',
      payload: 'error'
    };
    const state = Map();
    assert.deepEqual(
      ThreadsStateReducer(state, action),
      state
        .set('fetching', false)
        .set('fetchingError', fromJS(action.payload))
    );
  });

  it('fetchThreadsFromAPI success', () => {
    return mockThreadsStateReducer.__with__('mockServer', {
      fetchThreads(user) {
        return Promise.resolve(user);
      }
    })(() =>
      mockThreadsStateReducer.fetchThreadsFromAPI('test')
        .then(action => assert.deepEqual(action, {
          type: 'FETCHING_DONE',
          payload: 'test'
        }))
    );
  });

  it('fetchThreadsFromAPI failure', () => {
    return mockThreadsStateReducer.__with__('mockServer', {
      fetchThreads() {
        return Promise.reject('error');
      }
    })(() =>
      mockThreadsStateReducer.fetchThreadsFromAPI()
        .then(action => assert.deepEqual(action, {
          type: 'FETCHING_ERROR',
          payload: 'error'
        }))
    );
  });
});

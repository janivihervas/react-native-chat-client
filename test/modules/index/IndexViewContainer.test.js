import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {describe, it, beforeEach} from 'mocha';
import {assert} from 'chai';
import {Map, List} from 'immutable';

import IndexViewContainer from '../../../src/modules/indexView/IndexViewContainer';
import configureStore from '../../../src/store/configureStore';

describe('IndexViewContainer', () => {
  let el;
  let store;

  beforeEach(() => {
    const renderer = TestUtils.createRenderer();
    store = configureStore();
    renderer.render(<IndexViewContainer store={store} currentUser={Map({id: '0', name: 'name'})}/>);
    el = renderer.getRenderOutput();
  });

  it('should pass props', () => {
    assert.deepEqual(el.props.threads, List([]));
    assert.equal(el.props.threadsFetched, false);
    assert.equal(el.props.fetching, false);

    assert.isFunction(el.props.fetchThreads);
    assert.isFunction(el.props.navigateToThreadView);
  });

  it('threads should be sorted and have lastMessage field inserted', () => {
    const threads = [
      {
        id: '0',
        participants: ['0', '1'],
        messages: [
          {
            author: 'Test0',
            time: 1,
            text: 'Test0'
          },
          {
            author: 'Test1',
            time: 2,
            text: 'Test1'
          },
          {
            author: 'Test1',
            time: 3,
            text: 'Test2'
          }
        ]
      },
      {
        id: '1',
        participants: ['0', '2'],
        messages: [
          {
            author: 'Test0',
            time: 4,
            text: 'Test3'
          },
          {
            author: 'Test2',
            time: 5,
            text: 'Test4'
          },
          {
            author: 'Test0',
            time: 6,
            text: 'Test5'
          }
        ]
      },
      {
        id: '3',
        participants: ['0', '4'],
        messages: [
          {
            author: 'Test0',
            time: 1,
            text: 'Test0'
          }
        ]
      }
    ];
    store.dispatch({
      type: 'THREADS_UPDATED',
      payload: threads
    });
    const renderer = TestUtils.createRenderer();
    renderer.render(<IndexViewContainer store={store} currentUser={Map({id: '0', name: '0'})}/>);
    el = renderer.getRenderOutput();

    assert.deepEqual(
      el.props.threads.toJS(),
      [
        {
          id: '1',
          participants: ['2'],
          lastMessage: {
            author: 'Test0',
            time: 6,
            text: 'Test5'
          },
          messages: [
            {
              author: 'Test0',
              time: 4,
              text: 'Test3'
            },
            {
              author: 'Test2',
              time: 5,
              text: 'Test4'
            },
            {
              author: 'Test0',
              time: 6,
              text: 'Test5'
            }
          ]
        },
        {
          id: '0',
          participants: ['1'],
          lastMessage: {
            author: 'Test1',
            time: 3,
            text: 'Test2'
          },
          messages: [
            {
              author: 'Test0',
              time: 1,
              text: 'Test0'
            },
            {
              author: 'Test1',
              time: 2,
              text: 'Test1'
            },
            {
              author: 'Test1',
              time: 3,
              text: 'Test2'
            }
          ]
        },
        {
          id: '3',
          participants: ['4'],
          lastMessage: {
            author: 'Test0',
            time: 1,
            text: 'Test0'
          },
          messages: [
            {
              author: 'Test0',
              time: 1,
              text: 'Test0'
            }
          ]
        }
      ]
    );
  });

  it('navigateToThreadView', () => {
    el.props.navigateToThreadView();
    const state = store.getState();

    assert.equal(state.getIn(['navigationState', 'currentView']), 'THREAD_VIEW');
  });

  it('fetchThreads', () => {
    assert.equal(store.getState().getIn(['threads', 'fetching']), false);

    el.props.fetchThreads();

    assert.equal(store.getState().getIn(['threads', 'fetching']), true);
  });

});

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {describe, it, beforeEach} from 'mocha';
import {assert} from 'chai';
import {Map, List} from 'immutable';

import IndexViewContainer from '../../../src/modules/indexView/IndexViewContainer';
import configureStore from '../../../src/redux/configureStore';

describe('IndexViewContainer', () => {
  let el;
  let store;

  beforeEach(() => {
    const renderer = TestUtils.createRenderer();
    store = configureStore();
    renderer.render(<IndexViewContainer store={store} currentUser={Map({id: '0'})}/>);
    el = renderer.getRenderOutput();
  });

  it('should pass props', () => {
    assert.deepEqual(el.props.threads, List([]));
    assert.equal(el.props.threadsFetched, false);
    assert.equal(el.props.fetching, false);

    assert.isFunction(el.props.fetchThreads);
    assert.isFunction(el.props.navigateToThreadView);
  });

  it('navigateToThreadView', () => {
    el.props.navigateToThreadView();
    const state = store.getState();

    assert.equal(state.getIn(['app', 'currentView', 'view']), 'THREAD_VIEW');
  });

  it('fetchThreads', () => {
    assert.equal(store.getState().getIn(['index', 'fetching']), false);

    el.props.fetchThreads();

    assert.equal(store.getState().getIn(['index', 'fetching']), true);
  });

});

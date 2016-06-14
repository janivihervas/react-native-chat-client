import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {describe, it, beforeEach} from 'mocha';
import {assert} from 'chai';

import AppContainer from '../../../src/modules/app/AppContainer';
import getStore from '../../getStore';

describe('AppContainer', () => {
  let el;
  let store;

  beforeEach(() => {
    const renderer = TestUtils.createRenderer();
    store = getStore();
    renderer.render(<AppContainer store={store}/>);
    el = renderer.getRenderOutput();
  });

  it('should pass props', () => {
    assert.isString(el.props.currentView);
    assert.isFunction(el.props.navigateToThread);
    assert.isFunction(el.props.navigateToThreadList);
  });

  it('navigateToThread', () => {
    el.props.navigateToThread();
    const state = store.getState();

    assert.equal(state.appState.get('currentView'), 'thread');
  });

  it('navigateToThreadList', () => {
    el.props.navigateToThreadList();
    const state = store.getState();

    assert.equal(state.appState.get('currentView'), 'thread list');
  });

});

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
  });

  // TODO: move these to IndexViewContainer and ThreadViewContainer

  // it('navigateToThreadView', () => {
  //   el.props.navigateToThreadView();
  //   const state = store.getState();
  //
  //   assert.equal(state.appState.get('currentView'), NAVIGATION.THREAD_VIEW);
  // });
  //
  // it('navigateToIndexView', () => {
  //   el.props.navigateToIndexView();
  //   const state = store.getState();
  //
  //   assert.equal(state.appState.get('currentView'), NAVIGATION.INDEX_VIEW);
  // });

});

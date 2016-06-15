import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {describe, it, beforeEach} from 'mocha';
import {assert} from 'chai';

import AppContainer from '../../../src/modules/app/AppContainer';
import configureStore from '../../../src/redux/configureStore';

describe('AppContainer', () => {
  let el;
  let store;

  beforeEach(() => {
    const renderer = TestUtils.createRenderer();
    store = configureStore();
    renderer.render(<AppContainer store={store}/>);
    el = renderer.getRenderOutput();
  });

  it('should pass props', () => {
    assert.isString(el.props.currentView);
  });

  // TODO: move this to ThreadViewContainer

  //
  // it('navigateToIndexView', () => {
  //   el.props.navigateToIndexView();
  //   const state = store.getState();
  //
  //   assert.equal(state.appState.get('currentView'), NAVIGATION.INDEX_VIEW);
  // });

});

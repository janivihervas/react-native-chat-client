import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {describe, it, beforeEach} from 'mocha';
import {assert} from 'chai';

import App from '../../../src/modules/app/App';
import IndexViewContainer from '../../../src/modules/indexView/IndexViewContainer';
import ThreadViewContainer from '../../../src/modules/threadView/ThreadViewContainer';
import {NAVIGATION} from '../../../src/modules/app/AppState';

describe('App', () => {
  let renderer;

  beforeEach(() => {
    renderer = TestUtils.createRenderer();
  });

  it('should render IndexViewContainer', () => {
    const fn = () => {
    };
    renderer.render((
      <App
        currentView={NAVIGATION.INDEX_VIEW}
        navigateToIndexView={fn}
        navigateToThreadView={fn}
      />
    ));
    const el = renderer.getRenderOutput();

    assert.deepEqual(el, <IndexViewContainer />);
  });

  it('should render ThreadViewContainer', () => {
    const fn = () => {
    };
    renderer.render((
      <App
        currentView={NAVIGATION.THREAD_VIEW}
        navigateToIndexView={fn}
        navigateToThreadView={fn}
      />
    ));
    const el = renderer.getRenderOutput();

    assert.deepEqual(el, <ThreadViewContainer />);
  });

});

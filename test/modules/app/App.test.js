import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {describe, it, beforeEach} from 'mocha';
import {assert} from 'chai';

import App from '../../../src/modules/app/App';
import IndexView from '../../../src/modules/indexView/IndexView';
import ThreadView from '../../../src/modules/threadView/ThreadView';
import {NAVIGATION} from '../../../src/modules/app/AppState';

describe('App', () => {
  let renderer;

  beforeEach(() => {
    renderer = TestUtils.createRenderer();
  });

  it('should render IndexView', () => {
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

    assert.deepEqual(el, <IndexView currentView={NAVIGATION.INDEX_VIEW} navigateToThreadView={fn}/>);
  });

  it('should render ThreadView', () => {
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

    assert.deepEqual(el, <ThreadView currentView={NAVIGATION.THREAD_VIEW} navigateToIndexView={fn}/>);
  });

});

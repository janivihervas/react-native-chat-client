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
  const fn = () => {
  };
  const user = {
    id: '0',
    name: 'Current User'
  };

  beforeEach(() => {
    renderer = TestUtils.createRenderer();
  });

  it('should render IndexViewContainer', () => {
    renderer.render((
      <App
        currentView={NAVIGATION.INDEX_VIEW}
        navigateToIndexView={fn}
        navigateToThreadView={fn}
        currentUser={user}
      />
    ));
    const el = renderer.getRenderOutput();

    assert.deepEqual(el, <IndexViewContainer currentUser={user} />);
  });

  it('should render ThreadViewContainer', () => {
    renderer.render((
      <App
        currentView={NAVIGATION.THREAD_VIEW}
        navigateToIndexView={fn}
        navigateToThreadView={fn}
        currentUser={user}
      />
    ));
    const el = renderer.getRenderOutput();

    assert.deepEqual(el, <ThreadViewContainer />);
  });

  it('should render error message if given wrong currentView prop', () => {
    renderer.render((
      <App
        currentView={'not found'}
        navigateToIndexView={fn}
        navigateToThreadView={fn}
        currentUser={user}
      />
    ));
    const el = renderer.getRenderOutput();

    assert.equal(el.type.displayName, 'Text');
    assert.isString(el.props.children);
  });

});

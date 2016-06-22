import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {describe, it, beforeEach} from 'mocha';
import {assert} from 'chai';
import {Map} from 'immutable';

import App from '../../../src/modules/app/App';
import IndexViewContainer from '../../../src/modules/indexView/IndexViewContainer';
import ThreadViewContainer from '../../../src/modules/threadView/ThreadViewContainer';
import {VIEWS} from '../../../src/state/NavigationState';

describe('App', () => {
  let renderer;
  const fn = () => {
  };
  const user = Map({
    id: '0',
    name: 'Current User'
  });

  beforeEach(() => {
    renderer = TestUtils.createRenderer();
  });

  it('should render IndexViewContainer', () => {
    renderer.render((
      <App
        currentView={VIEWS.INDEX_VIEW}
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
        currentView={VIEWS.THREAD_VIEW}
        navigateToIndexView={fn}
        navigateToThreadView={fn}
        currentUser={user}
        threadID='test'
      />
    ));
    const el = renderer.getRenderOutput();

    assert.deepEqual(el, <ThreadViewContainer currentUser={user} threadID='test' />);
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

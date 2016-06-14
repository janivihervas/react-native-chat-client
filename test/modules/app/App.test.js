import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {describe, it, beforeEach} from 'mocha';
import {assert} from 'chai';

import App from '../../../src/modules/app/App';
import ThreadList from '../../../src/modules/threadList/ThreadList';
import Thread from '../../../src/modules/thread/Thread';

describe('App', () => {
  let renderer;

  beforeEach(() => {
    renderer = TestUtils.createRenderer();
  });

  it('should render ThreadList', () => {
    const fn = () => {};
    renderer.render(<App currentView='thread list' navigateToThread={fn} navigateToThreadList={fn}/>);
    const el = renderer.getRenderOutput();

    assert.deepEqual(el, <ThreadList currentView='thread list' navigateToThread={fn}/>);
  });

  it('should render Thread', () => {
    const fn = () => {};
    renderer.render(<App currentView='thread' navigateToThread={fn} navigateToThreadList={fn}/>);
    const el = renderer.getRenderOutput();

    assert.deepEqual(el, <Thread currentView='thread' navigateToThreadList={fn}/>);
  });

});

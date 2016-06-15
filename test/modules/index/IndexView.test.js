import React from 'react';
import {View} from 'react-native';
import TestUtils from 'react-addons-test-utils';
import {describe, it} from 'mocha';
import {assert} from 'chai';

import IndexView from '../../../src/modules/indexView/IndexView';
import IndexViewHeader from '../../../src/components/IndexViewHeader';
import ThreadList from '../../../src/components/ThreadList';

describe('IndexView', () => {
  it('should render IndexViewContainer and ThreadList', () => {
    const fn = () => {};

    const renderer = TestUtils.createRenderer();
    renderer.render((
      <IndexView
        navigateToThreadView={fn}
        threadsFetched={false}
        fetchThreads={fn}
        threads={[]}
        fetching={false}
      />
    ));
    const el = renderer.getRenderOutput();

    assert.deepEqual(el, (
      <View>
        <IndexViewHeader
          fetching={false}
        />
        <ThreadList
          navigateToThreadView={fn}
          threads={[]}
        />
      </View>
    ));
  });

  it('should call fetchThreads if !threadsFetched on componentDidMount', () => {
    let called = false;
    let threadsFetched = false;

    const fn = () => {};
    const fetchThreads = () => {called = true;};

    const render = () => {
      const renderer = TestUtils.createRenderer();
      renderer.render((
        <IndexView
          navigateToThreadView={fn}
          threadsFetched={threadsFetched}
          fetchThreads={fetchThreads}
          threads={[]}
          fetching={false}
        />
      ));
      return renderer._instance._instance;
    };

    let instance = render();
    assert.equal(called, false);
    instance.componentDidMount();
    assert.equal(called, true);

    called = false;
    threadsFetched = true;

    instance = render();
    assert.equal(called, false);
    instance.componentDidMount();
    assert.equal(called, false);
  });

});

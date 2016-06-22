import React from 'react';
import {View} from 'react-native';
import TestUtils from 'react-addons-test-utils';
import {describe, it} from 'mocha';
import {assert} from 'chai';
import {List} from 'immutable';

import {assertReactElements} from '../../helpers';
import IndexView from '../../../src/modules/indexView/IndexView';
import IndexViewHeader from '../../../src/components/IndexViewHeader';
import ThreadList from '../../../src/components/ThreadList';

describe('IndexView', () => {
  it('should render IndexViewHeader and ThreadList', () => {
    const fn = () => {};

    const renderer = TestUtils.createRenderer();
    renderer.render((
      <IndexView
        navigateToThreadView={fn}
        threadsFetched={false}
        fetchThreads={fn}
        threads={List([])}
        fetching={false}
        currentUser='user'
      />
    ));
    const el = renderer.getRenderOutput();

    assertReactElements(el, (
      <View>
        <IndexViewHeader
          fetching={false}
        />
        <ThreadList
          navigateToThreadView={fn}
          threads={List([])}
          currentUser='user'
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
          threads={List([])}
          fetching={false}
          currentUser='user'
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

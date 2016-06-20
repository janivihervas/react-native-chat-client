import React from 'react';
import {View} from 'react-native';
import TestUtils from 'react-addons-test-utils';
import {describe, it} from 'mocha';
import {List, Map} from 'immutable';

import {assertReactElements} from '../../helpers';
import ThreadView from '../../../src/modules/threadView/ThreadView';
import ThreadViewHeader from '../../../src/components/ThreadViewHeader';
import MessageList from '../../../src/components/MessageList';

describe('ThreadView', () => {
  it('should render ThreadViewHeader and MessageList', () => {
    const fn = () => {};
    const list = List([]);
    const map = Map({});

    const renderer = TestUtils.createRenderer();
    renderer.render((
      <ThreadView
        navigateToIndexView={fn}
        participants={list}
        currentUser={map}
        messages={list}
      />
    ));
    const el = renderer.getRenderOutput();

    assertReactElements(el, (
      <View>
        <ThreadViewHeader
          navigateToIndexView={fn}
          participants={list}
        />
        <MessageList
          currentUser={map}
          messages={list}
        />
      </View>
    ));
  });
});

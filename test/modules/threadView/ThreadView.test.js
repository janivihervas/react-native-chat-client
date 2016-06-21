import React from 'react';
import {View} from 'react-native';
import TestUtils from 'react-addons-test-utils';
import {describe, it} from 'mocha';
import {List} from 'immutable';

import {assertReactElements} from '../../helpers';
import ThreadView from '../../../src/modules/threadView/ThreadView';
import ThreadViewHeader from '../../../src/components/ThreadViewHeader';
import MessageList from '../../../src/components/MessageList';

describe('ThreadView', () => {
  it('should render ThreadViewHeader and MessageList', () => {
    const fn = () => {};
    const list = List([]);
    const user = 'name';

    const renderer = TestUtils.createRenderer();
    renderer.render((
      <ThreadView
        navigateToIndexView={fn}
        participants={list}
        currentUser={user}
        messages={list}
        lastMessageTime={1}
      />
    ));
    const el = renderer.getRenderOutput();

    assertReactElements(el, (
      <View>
        <ThreadViewHeader
          navigateToIndexView={fn}
          participants={list}
          lastMessageTime={1}
        />
        <MessageList
          currentUser={user}
          messages={list}
        />
      </View>
    ));
  });
});

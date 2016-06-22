import React from 'react';
import {View, Text} from 'react-native';
import TestUtils from 'react-addons-test-utils';
import {describe, it, beforeEach} from 'mocha';
import {List, fromJS} from 'immutable';
import {assert} from 'chai';

import {assertReactElements} from '../helpers';
import ThreadList from '../../src/components/ThreadList';
import ThreadItem from '../../src/components/ThreadItem';

describe('ThreadList', () => {
  let renderer;
  const fn = () => {
  };

  beforeEach(() => {
    renderer = TestUtils.createRenderer();
  });

  it('should render error message if no threads are given as props', () => {
    renderer.render((
      <ThreadList threads={List([])} navigateToThreadView={fn} currentUser='user'/>
    ));
    const el = renderer.getRenderOutput();

    assertReactElements(el, (
      <View>
        <Text/>
      </View>
    ));
  });

  it('should render ListView for non-empty thread list', () => {
    const threads = fromJS([
      {id: '1', lastMessage: {}, participants: []}
    ]);
    renderer.render((
      <ThreadList threads={threads} navigateToThreadView={fn} currentUser='user'/>
    ));
    const el = renderer.getRenderOutput();

    assert.equal(el.type.displayName, 'ListView');
    assert.isOk(el.props.dataSource);
    assert.isFunction(el.props.renderRow);
  });

  it('renderRow', () => {
    const threads = fromJS([
      {id: '1', lastMessage: {author: 'test', text: 'blaa', time: 0}, participants: ['0', '1']}
    ]);
    renderer.render((
      <ThreadList threads={threads} navigateToThreadView={fn} currentUser='user'/>
    ));

    const instance = renderer._instance._instance;

    assert.isFunction(instance.renderRow);
    assert.deepEqual(instance.renderRow(threads.get(0), 'section', 'row'), (
      <ThreadItem
        key='thread-item-section-row'
        id={threads.get(0).get('id')}
        text={threads.get(0).getIn(['lastMessage', 'text'])}
        time={threads.get(0).getIn(['lastMessage', 'time'])}
        author={threads.get(0).getIn(['lastMessage', 'author'])}
        participants={threads.get(0).get('participants')}
        navigateToThreadView={fn}
        currentUser='user'
      />
    ));
  });

  it('should set new data to state when receiving props', () => {
    let threads = fromJS([
      {id: '1', lastMessage: {author: 'test', text: 'blaa'}, participants: ['0', '1']}
    ]);
    renderer.render((
      <ThreadList threads={threads} navigateToThreadView={fn} currentUser='user'/>
    ));

    const instance = renderer._instance._instance;

    assert.deepEqual(instance.state.dataSource, instance.state.ds.cloneWithRows(threads.toArray()));

    threads = threads.push(fromJS({
      id: '2',
      lastMessage: {author: 'test2', text: 'blaa2'},
      participants: ['0', '1', '2']
    }));

    instance.componentWillReceiveProps({threads});
    assert.deepEqual(instance.state.dataSource, instance.state.ds.cloneWithRows(threads.toArray()));
  });

});

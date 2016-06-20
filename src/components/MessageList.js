import React, {Component, PropTypes} from 'react';
import {Text} from 'react-native';
import {List} from 'immutable';

export default class MessageList extends Component {
  render() {
    return <Text>Message list</Text>;
  }
}

MessageList.propTypes = {
  currentUser: PropTypes.string.isRequired,
  messages: PropTypes.instanceOf(List).isRequired
};

MessageList.displayName = 'MessageList';

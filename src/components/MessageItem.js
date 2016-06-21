import React, {Component, PropTypes} from 'react';
import {Text} from 'react-native';

export default class MessageItem extends Component {
  render() {
    return <Text>MessageItem</Text>;
  }
}

MessageItem.propTypes = {
  currentUser: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired
};

MessageItem.displayName = 'MessageItem';

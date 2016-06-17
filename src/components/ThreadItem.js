import React, {Component, PropTypes} from 'react';
import {View, Text} from 'react-native';
import {Map, List} from 'immutable';

export default class ThreadItem extends Component {
  render() {
    return (
      <View>
        <Text>Thread</Text>
      </View>
    );
  }
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  participants: PropTypes.instanceOf(List).isRequired,
  lastMessage: PropTypes.instanceOf(Map).isRequired,
  navigateToThreadView: PropTypes.func.isRequired
};

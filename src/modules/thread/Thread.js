import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

export default class Thread extends Component {
  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.navigateToThreadList();
  }

  render() {
    return (
      <View>
        <Text>{this.props.currentView}</Text>
        <TouchableHighlight onPress={this.onPress}>
          <Text>Go to thread list</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

Thread.propTypes = {
  currentView: PropTypes.string.isRequired,
  navigateToThreadList: PropTypes.func.isRequired
};

import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

export default class ThreadList extends React.Component {
  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.navigateToThread();
  }

  render() {
    return (
      <View>
        <Text>{this.props.currentView}</Text>
        <TouchableHighlight onPress={this.onPress}>
          <Text>Go to thread</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

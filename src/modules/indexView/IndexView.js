import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

export default class IndexView extends Component {
  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.navigateToThreadView();
  }

  render() {
    return (
      <View>
        <Text>{this.props.currentView}</Text>
        <TouchableHighlight onPress={this.onPress}>
          <Text>Go to thread view</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

IndexView.propTypes = {
  currentView: PropTypes.string.isRequired,
  navigateToThreadView: PropTypes.func.isRequired
};

import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

export default class ThreadView extends Component {
  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.navigateToIndexView();
  }

  render() {
    return (
      <View>
        <Text>Thread</Text>
        <TouchableHighlight onPress={this.onPress}>
          <Text>Go to index view</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

ThreadView.propTypes = {
  navigateToIndexView: PropTypes.func.isRequired
};

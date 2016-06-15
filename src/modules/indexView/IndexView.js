import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';

export default class IndexView extends Component {
  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
  }

  componentDidMount() {
    if (!this.props.threadsFetched) {
      this.props.fetchThreads();
    }
  }

  onPress() {
    this.props.navigateToThreadView();
  }

  render() {
    return (
      <View>
        <Text>Index</Text>
        <TouchableHighlight onPress={this.onPress}>
          <Text>Go to thread view</Text>
        </TouchableHighlight>
        <Text>{JSON.stringify(this.props.threads)}</Text>
      </View>
    );
  }
}

IndexView.propTypes = {
  navigateToThreadView: PropTypes.func.isRequired,
  threadsFetched: PropTypes.bool.isRequired,
  fetchThreads: PropTypes.func.isRequired,
  threads: PropTypes.array.isRequired
};

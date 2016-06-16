import React, {Component, PropTypes} from 'react';
import {Text} from 'react-native';

export default class ThreadList extends Component {
  render() {
    return (
      <Text>ThreadList</Text>
    );
  }
}

ThreadList.propTypes = {
  navigateToThreadView: PropTypes.func.isRequired,
  threads: PropTypes.array.isRequired
};

ThreadList.displayName = 'ThreadList';

import React, {Component, PropTypes} from 'react';
import {Text} from 'react-native';
import {List} from 'immutable';

export default class ThreadViewHeader extends Component {
  render() {
    return <Text>Thread view header</Text>;
  }
}

ThreadViewHeader.propTypes = {
  navigateToIndexView: PropTypes.func.isRequired,
  participants: PropTypes.instanceOf(List).isRequired
};

ThreadViewHeader.displayName = 'ThreadViewHeader';

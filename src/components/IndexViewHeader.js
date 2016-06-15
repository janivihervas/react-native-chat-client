import React, {Component, PropTypes} from 'react';
import {Text} from 'react-native';

export default class IndexViewHeader extends Component {
  render() {
    return (
      <Text>IndexViewHeader</Text>
    );
  }
}

IndexViewHeader.propTypes = {
  fetching: PropTypes.bool.isRequired
};

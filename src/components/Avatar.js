import React, {Component, PropTypes} from 'react';
import {Text} from 'react-native';

export default class Avatar extends Component {
  render() {
    if (this.props.many) {
      return <Text>Many</Text>;
    }
    return <Text>One</Text>;
  }
}

Avatar.propTypes = {
  many: PropTypes.bool.isRequired
};

Avatar.displayName = 'Avatar';

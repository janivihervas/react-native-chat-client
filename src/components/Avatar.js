import React, {Component, PropTypes} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Avatar extends Component {
  render() {
    const size = 25;
    if (this.props.many) {
      return <FontAwesome name='users' size={size} />;
    }
    return <FontAwesome name='user' size={size} />;
  }
}

Avatar.propTypes = {
  many: PropTypes.bool.isRequired
};

Avatar.displayName = 'Avatar';

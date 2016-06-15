import React, {Component, PropTypes} from 'react';
import {Text} from 'react-native';

import {NAVIGATION} from './AppState';
import IndexViewContainer from '../indexView/IndexViewContainer';
import ThreadViewContainer from '../threadView/ThreadViewContainer';

export default class App extends Component {
  render() {
    switch (this.props.currentView) {
      case NAVIGATION.INDEX_VIEW: {
        return <IndexViewContainer />;
      }
      case NAVIGATION.THREAD_VIEW: {
        return <ThreadViewContainer />;
      }
      default: {
        return (
          <Text>How did you end up here?</Text>
        );
      }
    }
  }
}

App.propTypes = {
  currentView: PropTypes.string.isRequired
};

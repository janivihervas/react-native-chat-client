import React, {Component, PropTypes} from 'react';
import {Text} from 'react-native';
import {Map} from 'immutable';

import {NAVIGATION} from './AppState';
import IndexViewContainer from '../indexView/IndexViewContainer';
import ThreadViewContainer from '../threadView/ThreadViewContainer';

export default class App extends Component {
  render() {
    switch (this.props.currentView.get('view')) {
      case NAVIGATION.INDEX_VIEW: {
        return <IndexViewContainer currentUser={this.props.currentUser}/>;
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
  currentView: PropTypes.instanceOf(Map).isRequired,
  currentUser: PropTypes.instanceOf(Map).isRequired
};

App.displayName = 'Name';

import React, {Component, PropTypes} from 'react';
import {Text} from 'react-native';
import {Map} from 'immutable';

import {VIEWS} from '../../state/NavigationState';
import IndexViewContainer from '../indexView/IndexViewContainer';
import ThreadViewContainer from '../threadView/ThreadViewContainer';

export default class App extends Component {
  render() {
    switch (this.props.currentView) {
      case VIEWS.INDEX_VIEW: {
        return <IndexViewContainer currentUser={this.props.currentUser}/>;
      }
      case VIEWS.THREAD_VIEW: {
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
  currentView: PropTypes.string.isRequired,
  threadID: PropTypes.string,
  currentUser: PropTypes.instanceOf(Map).isRequired
};

App.displayName = 'App';

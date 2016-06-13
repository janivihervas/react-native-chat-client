import React, {Component, PropTypes} from 'react';

import {NAVIGATION} from './AppState';
import ThreadList from './threadList/ThreadList';
import Thread from './thread/Thread';

export default class App extends Component {
  render() {
    if (this.props.currentView === NAVIGATION.THREAD_LIST) {
      return <ThreadList
        currentView={this.props.currentView}
        navigateToThread={this.props.navigateToThread}
      />;
    }

    return <Thread
      currentView={this.props.currentView}
      navigateToThreadList={this.props.navigateToThreadList}
    />;
  }
}

App.propTypes = {
  currentView: PropTypes.string.isRequired,
  navigateToThread: PropTypes.func.isRequired,
  navigateToThreadList: PropTypes.func.isRequired
};

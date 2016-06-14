import React, {Component, PropTypes} from 'react';

import {NAVIGATION} from './AppState';
import IndexView from '../indexView/IndexView';
import ThreadView from '../threadView/ThreadView';

export default class App extends Component {
  render() {
    if (this.props.currentView === NAVIGATION.INDEX_VIEW) {
      return (
        <IndexView
          currentView={this.props.currentView}
          navigateToThreadView={this.props.navigateToThreadView}
        />
      );
    }

    return (
      <ThreadView
        currentView={this.props.currentView}
        navigateToIndexView={this.props.navigateToIndexView}
      />
    );
  }
}

App.propTypes = {
  currentView: PropTypes.string.isRequired,
  navigateToThreadView: PropTypes.func.isRequired,
  navigateToIndexView: PropTypes.func.isRequired
};

import React from 'react';

import {NAVIGATION} from './AppState';
import ThreadListContainer from './threadList/ThreadListContainer';
import ThreadContainer from './thread/ThreadContainer';

export default class App extends React.Component {
  render() {
    if (this.props.currentView === NAVIGATION.THREAD_LIST) {
      return <ThreadListContainer />;
    }

    return <ThreadContainer />;
  }
}

import {connect} from 'react-redux';

import App from './App';

export default connect(
  state => ({
    currentView: state.getIn(['navigationState', 'currentView']),
    threadID: state.getIn(['navigationState', 'threadID']),
    currentUser: state.getIn(['app', 'currentUser'])
  })
)(App);

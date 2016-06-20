import {connect} from 'react-redux';

import App from './App';

export default connect(
  state => ({
    currentView: state.getIn(['app', 'currentView']),
    currentUser: state.getIn(['app', 'currentUser'])
  })
)(App);

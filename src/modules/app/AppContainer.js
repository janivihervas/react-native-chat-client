import {connect} from 'react-redux';

import App from './App';

export default connect(
  state => ({
    currentView: state.app.get('currentView'),
    currentUser: state.app.get('currentUser')
  })
)(App);

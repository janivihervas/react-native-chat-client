import {connect} from 'react-redux';

import App from './App';

export default connect(
  state => ({
    currentView: state.appState.get('currentView')
  })
)(App);

import {connect} from 'react-redux';

import App from './App';
import {navigate} from './AppState';

export default connect(
  state => ({
    currentView: state.appState.get('currentView')
  }),
  dispatch => ({
    navigate: target => {
      dispatch(navigate(target));
    }
  })
)(App);

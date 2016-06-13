import {connect} from 'react-redux';

import App from './App';
import {navigate, NAVIGATION} from './AppState';

export default connect(
  state => ({
    currentView: state.appState.get('currentView')
  }),
  dispatch => ({
    navigateToThread: () => {
      dispatch(navigate('thread'));
    },
    navigateToThreadList: () => {
      dispatch(navigate(NAVIGATION.THREAD_LIST));
    }
  })
)(App);

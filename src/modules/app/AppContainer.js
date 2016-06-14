import {connect} from 'react-redux';

import App from './App';
import {navigate, NAVIGATION} from './AppState';

export default connect(
  state => ({
    currentView: state.appState.get('currentView')
  }),
  dispatch => ({
    navigateToThreadView: () => {
      dispatch(navigate(NAVIGATION.THREAD_VIEW));
    },
    navigateToIndexView: () => {
      dispatch(navigate(NAVIGATION.INDEX_VIEW));
    }
  })
)(App);

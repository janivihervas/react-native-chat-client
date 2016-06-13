import {connect} from 'react-redux';

import Thread from './Thread';
import {navigate, NAVIGATION} from '../AppState';

export default connect(
  state => ({
    currentView: state.appState.get('currentView')
  }),
  dispatch => ({
    navigateToThreadList: () => {
      dispatch(navigate(NAVIGATION.THREAD_LIST));
    }
  })
)(Thread);

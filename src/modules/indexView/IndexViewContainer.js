import {connect} from 'react-redux';

import IndexView from './IndexView';
import {navigate, NAVIGATION} from '../app/AppState';

export default connect(
  state => ({
    user: state.appState.get('currentUser'),
    threads: state.indexViewState.get('threads').toJS()
  }),
  dispatch => ({
    navigateToThreadView: () => {
      dispatch(navigate(NAVIGATION.THREAD_VIEW));
    }
  })
)(IndexView);

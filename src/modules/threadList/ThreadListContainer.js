import {connect} from 'react-redux';

import ThreadList from './ThreadList';
import {navigate} from '../AppState';

export default connect(
  state => ({
    currentView: state.appState.get('currentView')
  }),
  dispatch => ({
    navigateToThread: () => {
      dispatch(navigate('thread'));
    }
  })
)(ThreadList);

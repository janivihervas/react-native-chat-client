import {connect} from 'react-redux';

import ThreadView from './ThreadView';
import {navigate, NAVIGATION} from '../app/AppState';

export default connect(
  state => ({
    currentView: state.appState.get('currentView')
  }),
  dispatch => ({
    navigateToIndexView: () => {
      dispatch(navigate(NAVIGATION.INDEX_VIEW));
    }
  })
)(ThreadView);

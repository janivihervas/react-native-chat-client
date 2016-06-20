import {connect} from 'react-redux';

import ThreadView from './ThreadView';
import {navigate, NAVIGATION} from '../app/AppState';

export default connect(
  state => ({
    id: state.getIn(['thread', 'id']),
    participants: state.getIn(['thread', 'participants']),
    messages: state.getIn(['thread', 'messages'])
  }),
  dispatch => ({
    navigateToIndexView: () => {
      dispatch(navigate(NAVIGATION.INDEX_VIEW));
    }
  })
)(ThreadView);

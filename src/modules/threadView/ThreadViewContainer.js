import {connect} from 'react-redux';

import ThreadView from './ThreadView';
import {navigate, VIEWS} from '../../state/NavigationState';

export default connect(
  state => {
    const currentUser = state.getIn(['app', 'currentUser', 'name']);
    const id = state.getIn(['navigationState', 'threadID']);
    const thread = state
      .getIn(['threads', 'threads'])
      .filter(d => d.get('id') === id)
      .first();

    return {
      currentUser,
      participants: thread.get('participants')
        .filter(user =>
          user !== currentUser
        ),
      messages: thread.get('messages')
    };
  },
  dispatch => ({
    navigateToIndexView: () => {
      dispatch(navigate(VIEWS.INDEX_VIEW));
    }
  })
)(ThreadView);

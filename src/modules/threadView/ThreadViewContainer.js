import {connect} from 'react-redux';

import ThreadView from './ThreadView';
import {navigate, VIEWS} from '../../state/NavigationState';
import {newMessage} from '../../state/ThreadsState';

export default connect(
  (state, ownProps) => {
    const currentUser = ownProps.currentUser.get('name');
    const thread = state
      .getIn(['threads', 'threads'])
      .filter(d => d.get('id') === ownProps.threadID)
      .first();

    return {
      currentUser,
      participants: thread.get('participants')
        .filter(user =>
          user !== currentUser
        ),
      messages: thread.get('messages'),
      lastMessageTime: thread.getIn(['lastMessage', 'time'])
    };
  },
  (dispatch, ownProps) => ({
    navigateToIndexView: () => {
      dispatch(navigate(VIEWS.INDEX_VIEW));
    },
    submit: message => {
      dispatch(newMessage(ownProps.threadID, ownProps.currentUser.get('name'), message));
    }
  })
)(ThreadView);

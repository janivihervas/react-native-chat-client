import {connect} from 'react-redux';

import IndexView from './IndexView';
import {navigate, VIEWS} from '../../state/NavigationState';
import {fetchThreads} from '../../state/ThreadsState';

export default connect(
  (state, ownProps) => {
    const threads = state.getIn(['threads','threads'])
      .map(thread => thread
        .set('lastMessage', thread.get('messages').last())
        .update('participants', participants =>
          participants.filter(user =>
            user !== ownProps.currentUser.get('name')
          )
        )
      )
      .sort((a, b) => {
        if (a.getIn(['lastMessage', 'time']) < b.getIn(['lastMessage', 'time'])) {
          return 1;
        }
        return -1;
      });

    return {
      threads,
      threadsFetched: state.getIn(['threads', 'threadsFetched']),
      fetching: state.getIn(['threads', 'fetching'])
    };
  },
  (dispatch, ownProps) => ({
    navigateToThreadView: (id) => {
      dispatch(navigate(VIEWS.THREAD_VIEW, id));
    },
    fetchThreads: () => {
      dispatch(fetchThreads(ownProps.currentUser.get('id')));
    }
  })
)(IndexView);

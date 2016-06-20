import {connect} from 'react-redux';

import IndexView from './IndexView';
import {navigate, NAVIGATION} from '../app/AppState';
import {fetchThreads} from './IndexViewState';

export default connect(
  (state, ownProps) => {
    const threads = state.getIn(['index','threads'])
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
      threadsFetched: state.getIn(['index', 'threadsFetched']),
      fetching: state.getIn(['index', 'fetching'])
    };
  },
  (dispatch, ownProps) => ({
    navigateToThreadView: (id) => {
      dispatch(navigate(NAVIGATION.THREAD_VIEW, id));
    },
    fetchThreads: () => {
      dispatch(fetchThreads(ownProps.currentUser.get('id')));
    }
  })
)(IndexView);

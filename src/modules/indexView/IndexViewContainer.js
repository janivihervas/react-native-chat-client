import {connect} from 'react-redux';

import IndexView from './IndexView';
import {navigate, NAVIGATION} from '../app/AppState';
import {fetchThreads} from './IndexViewState';

export default connect(
  state => {
    return {
      threads: state.index.get('threads').toJS(),
      threadsFetched: state.index.get('threadsFetched'),
      fetching: state.index.get('fetching')
    };
  },
  (dispatch, ownProps) => ({
    navigateToThreadView: () => {
      dispatch(navigate(NAVIGATION.THREAD_VIEW));
    },
    fetchThreads: () => {
      dispatch(fetchThreads(ownProps.currentUser.id));
    }
  })
)(IndexView);

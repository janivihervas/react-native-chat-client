import {connect} from 'react-redux';

import IndexView from './IndexView';
import {navigate, NAVIGATION} from '../app/AppState';
import {fetchThreads} from './IndexViewState';

export default connect(
  state => {
    return {
      threads: state.getIn(['index','threads']),
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

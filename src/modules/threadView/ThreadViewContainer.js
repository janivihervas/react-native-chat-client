import {connect} from 'react-redux';

import ThreadView from './ThreadView';
import {navigate, VIEWS} from '../../state/NavigationState';

export default connect(
  state => {
    const id = state.getIn(['navigationState', 'threadID']);
    const thread = state
      .getIn(['threads', 'threads'])
      .filter(d => d.get('id') === id)
      .first();

    return {
      id,
      participants: thread.get('participants'),
      messages: thread.get('messages')
    };
  },
  dispatch => ({
    navigateToIndexView: () => {
      dispatch(navigate(VIEWS.INDEX_VIEW));
    }
  })
)(ThreadView);

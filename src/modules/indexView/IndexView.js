import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';

import IndexViewHeader from '../../components/IndexViewHeader';
import ThreadList from '../../components/ThreadList';

export default class IndexView extends Component {
  componentDidMount() {
    if (!this.props.threadsFetched) {
      this.props.fetchThreads();
    }
  }

  render() {
    return (
      <View>
        <IndexViewHeader
          fetching={this.props.fetching}
        />
        <ThreadList
          navigateToThreadView={this.props.navigateToThreadView}
          threads={this.props.threads}
        />
      </View>
    );
  }
}

IndexView.propTypes = {
  navigateToThreadView: PropTypes.func.isRequired,
  threadsFetched: PropTypes.bool.isRequired,
  fetchThreads: PropTypes.func.isRequired,
  threads: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired
};

IndexView.displayName = 'IndexView';

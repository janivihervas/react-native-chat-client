import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';
import {List} from 'immutable';

import IndexViewHeader from '../../components/IndexViewHeader';
import ThreadList from '../../components/ThreadList';
import common from '../../styles/common';

export default class IndexView extends Component {
  componentDidMount() {
    if (!this.props.threadsFetched) {
      this.props.fetchThreads();
    }
  }

  render() {
    // TODO: show spinner instead of list if fetching, remove from header
    return (
      <View style={common.fullSize}>
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
  threads: PropTypes.instanceOf(List).isRequired,
  fetching: PropTypes.bool.isRequired
};

IndexView.displayName = 'IndexView';

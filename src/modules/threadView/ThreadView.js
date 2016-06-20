import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';
import {List} from 'immutable';

import ThreadViewHeader from '../../components/ThreadViewHeader';
import MessageList from '../../components/MessageList';
import common from '../../styles/common';

export default class ThreadView extends Component {
  render() {
    return (
      <View style={common.fullSize}>
        <ThreadViewHeader
          navigateToIndexView={this.props.navigateToIndexView}
          participants={this.props.participants}
        />
        <MessageList
          currentUser={this.props.currentUser}
          messages={this.props.messages}
        />
      </View>
    );
  }
}

ThreadView.propTypes = {
  navigateToIndexView: PropTypes.func.isRequired,
  participants: PropTypes.instanceOf(List).isRequired,
  currentUser: PropTypes.string.isRequired,
  messages: PropTypes.instanceOf(List).isRequired
};

ThreadView.displayName = 'ThreadView';

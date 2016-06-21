import React, {Component, PropTypes} from 'react';
import {ListView} from 'react-native';
import Immutable, {List} from 'immutable';

import common from '../styles/common';
import MessageItem from './MessageItem';

export default class MessageList extends Component {
  constructor(props) {
    super();
    this.renderRow = this.renderRow.bind(this);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.messages.toArray()),
      ds
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.ds.cloneWithRows(nextProps.messages.toArray())
    });
  }

  renderRow(rowData) {
    return (
      <MessageItem
        currentUser={this.props.currentUser}
        author={rowData.get('author')}
        text={rowData.get('text')}
        time={rowData.get('time')}
      />
    );
  }

  render() {
    // TODO: renderSeparator() ?
    return (
      <ListView
        style={[common.fullSize, common.paddingHorizontal, common.paddingVertical]}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

MessageList.propTypes = {
  currentUser: PropTypes.string.isRequired,
  messages: PropTypes.instanceOf(List).isRequired
};

MessageList.displayName = 'MessageList';

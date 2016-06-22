import React, {Component, PropTypes} from 'react';
import {ListView, View} from 'react-native';
import Immutable, {List} from 'immutable';

import common, {variables} from '../styles/common';
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

  renderRow(rowData, sectionID, rowID) {
    return (
      <MessageItem
        key={`message-item-${sectionID}-${rowID}`}
        currentUser={this.props.currentUser}
        author={rowData.get('author')}
        text={rowData.get('text')}
        time={rowData.get('time')}
      />
    );
  }

  renderSeparator(sectionID, rowID) {
    return <View key={`message-item-separator-${sectionID}-${rowID}`} style={[{height: 10}]} />;
  }

  renderHeader() {
    return <View key='message-list-header' style={[{height: variables.padding}]} />;
  }

  renderFooter() {
    return <View key='message-list-footer' style={[{height: variables.padding}]} />;
  }

  render() {
    return (
      <ListView
        style={common.list}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        renderHeader={this.renderHeader}
        renderFooter={this.renderFooter}
      />
    );
  }
}

MessageList.propTypes = {
  currentUser: PropTypes.string.isRequired,
  messages: PropTypes.instanceOf(List).isRequired
};

MessageList.displayName = 'MessageList';

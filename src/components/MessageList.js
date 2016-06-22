import React, {Component, PropTypes} from 'react';
import {ListView, View} from 'react-native';
import Immutable, {List} from 'immutable';

import common, {variables} from '../styles/common';
import MessageItem from './MessageItem';

export default class MessageList extends Component {
  constructor(props) {
    super();
    this.renderRow = this.renderRow.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.messages.toArray()),
      ds
    };
  }

  // componentDidMount() {
  //   this.scrollToBottom();
  // }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.ds.cloneWithRows(nextProps.messages.toArray())
    });
  }

  // componentDidUpdate() {
  //   this.scrollToBottom();
  // }

  scrollToBottom() {
    const {listView} = this.refs;
    listView.requestAnimationFrame(() => {
      // keep this animated, because it seems to be hard to render
      // the initial view to be scrolled to bottom
      // TODO: iOS is bugged
      listView.scrollTo({
        y: listView.getMetrics().contentLength
      });
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
        ref='listView'
        style={common.list}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        renderHeader={this.renderHeader}
        renderFooter={this.renderFooter}
        onLayout={this.scrollToBottom}
      />
    );
  }
}

MessageList.propTypes = {
  currentUser: PropTypes.string.isRequired,
  messages: PropTypes.instanceOf(List).isRequired
};

MessageList.displayName = 'MessageList';

import React, {Component, PropTypes} from 'react';
import {Text, View, ListView, StyleSheet} from 'react-native';
import Immutable, {List} from 'immutable';

import common, {variables} from '../styles/common';
import ThreadItem from './ThreadItem';

export default class ThreadList extends Component {
  constructor(props) {
    super();
    this.renderRow = this.renderRow.bind(this);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => !Immutable.is(r1, r2)
    });

    this.state = {
      dataSource: ds.cloneWithRows(props.threads.toArray()),
      ds
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.ds.cloneWithRows(nextProps.threads.toArray())
    });
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <ThreadItem
        key={`thread-item-${sectionID}-${rowID}`}
        id={rowData.get('id')}
        text={rowData.getIn(['lastMessage', 'text'])}
        time={rowData.getIn(['lastMessage', 'time'])}
        author={rowData.getIn(['lastMessage', 'author'])}
        participants={rowData.get('participants')}
        navigateToThreadView={this.props.navigateToThreadView}
        currentUser={this.props.currentUser}
      />
    );
  }

  renderSeparator(sectionID, rowID) {
    return <View key={`thread-item-separator-${sectionID}-${rowID}`} style={[{height: 10}]} />;
  }

  renderHeader() {
    return <View key='thread-list-header' style={[{height: variables.padding}]} />;
  }

  renderFooter() {
    return <View key='thread-list-footer' style={[{height: variables.padding}]} />;
  }

  render() {
    const {threads} = this.props;
    if (!threads.size) {
      return (
        <View style={[styles.error, common.fullSize]}>
          <Text>No threads :(</Text>
        </View>
      );
    }

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

ThreadList.propTypes = {
  navigateToThreadView: PropTypes.func.isRequired,
  threads: PropTypes.instanceOf(List).isRequired,
  currentUser: PropTypes.string.isRequired
};

ThreadList.displayName = 'ThreadList';

const styles = StyleSheet.create({
  error: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

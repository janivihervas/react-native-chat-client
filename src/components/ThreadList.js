import React, {Component, PropTypes} from 'react';
import {Text, View, ListView, StyleSheet} from 'react-native';
import Immutable, {List} from 'immutable';

import common from '../styles/common';
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

  renderRow(rowData) {
    return (
      <ThreadItem
        id={rowData.get('id')}
        lastMessage={rowData.get('lastMessage')}
        participants={rowData.get('participants')}
        navigateToThreadView={this.props.navigateToThreadView}
      />
    );
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
        style={[common.fullSize, common.padding]}
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

ThreadList.propTypes = {
  navigateToThreadView: PropTypes.func.isRequired,
  threads: PropTypes.instanceOf(List).isRequired
};

ThreadList.displayName = 'ThreadList';

const styles = StyleSheet.create({
  error: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

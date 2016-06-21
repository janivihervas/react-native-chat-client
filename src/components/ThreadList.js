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
        text={rowData.getIn(['lastMessage', 'text'])}
        time={rowData.getIn(['lastMessage', 'time'])}
        author={rowData.getIn(['lastMessage', 'author'])}
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
    // TODO: renderSeparator()
    return (
      <ListView
        style={[common.fullSize, common.paddingHorizontal, common.paddingVertical]}
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

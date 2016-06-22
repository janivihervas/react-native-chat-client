import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {List} from 'immutable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import common, {colors, variables} from '../styles/common';

export default class ThreadViewHeader extends Component {
  constructor() {
    super();

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.navigateToIndexView();
  }

  render() {
    const time = this.props.lastMessageTime;
    let fmtTime = moment(time);
    if (fmtTime.date() !== moment().date()) {
      fmtTime = fmtTime.format('D. MMM HH:mm');
    } else {
      fmtTime = fmtTime.format('HH:mm');
    }

    return (
      <View style={[common.header, common.paddingHorizontal, {justifyContent: 'flex-start'}]}>
        <View style={[styles.inner, {paddingRight: variables.padding}]} >
          <MaterialIcons name='arrow-back' size={20} color={colors.white} onPress={this.onPress} />
        </View>
        <View style={styles.inner}>
          <Text style={common.headerText}>{this.props.participants.toArray().join(', ')}</Text>
          <Text style={common.headerText}>Last message: {fmtTime}</Text>
        </View>
      </View>
    );
  }
}

ThreadViewHeader.propTypes = {
  navigateToIndexView: PropTypes.func.isRequired,
  participants: PropTypes.instanceOf(List).isRequired,
  lastMessageTime: PropTypes.number.isRequired
};

ThreadViewHeader.displayName = 'ThreadViewHeader';

const styles = StyleSheet.create({
  inner: {
    justifyContent: 'center'
  }
});


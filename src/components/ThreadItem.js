import React, {Component, PropTypes} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {List} from 'immutable';
import moment from 'moment';

import Avatar from './Avatar';
import {colors} from '../styles/common';

export default class ThreadItem extends Component {
  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.navigateToThreadView(this.props.id);
  }

  render() {
    const participants = this.props.participants.toArray().sort().join(', ');
    const {text, time} = this.props;
    const author = this.props.currentUser === this.props.author ? 'You' : this.props.author;
    let fmtTime = moment(time);
    if (fmtTime.date() !== moment().date()) {
      fmtTime = fmtTime.format('D. MMM');
    } else {
      fmtTime = fmtTime.format('HH:mm');
    }

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.container}>
          <View style={[styles.outer, {alignItems: 'center', justifyContent: 'center'}]}>
            <Avatar many={this.props.participants.size > 1} />
          </View>
          <View style={styles.inner}>
            <Text numberOfLines={1} style={[{color: colors.black}]}>{participants}</Text>
            <Text numberOfLines={1} style={[{color: colors.black}]}>{author}: {text}</Text>
          </View>
          <View style={[styles.outer, {alignItems: 'flex-end'}]}>
            <Text numberOfLines={1} style={[{color: colors.black}]}>{fmtTime}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  participants: PropTypes.instanceOf(List).isRequired,
  text: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  navigateToThreadView: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired
};

ThreadItem.displayName = 'ThreadItem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    padding: 5,
    paddingLeft: 0,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.grey
  },
  outer: {
    width: 50
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between'
  }
});

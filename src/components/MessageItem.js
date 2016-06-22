import React, {Component, PropTypes} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import moment from 'moment';

import {colors} from '../styles/common';

export default class MessageItem extends Component {
  render() {
    let fmtTime = moment(this.props.time);
    if (fmtTime.date() !== moment().date()) {
      fmtTime = fmtTime.format('D. MMM HH:mm');
    } else {
      fmtTime = fmtTime.format('HH:mm');
    }
    let author = this.props.author;
    let align = styles.alignRight;
    if (this.props.currentUser === this.props.author) {
      author = 'You';
      align = styles.alignLeft;
    }

    return (
      <View style={align}>
        <View style={styles.header}>
          <Text style={styles.text}>{author}</Text><Text style={styles.text}>{fmtTime}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      </View>
    );
  }
}

MessageItem.propTypes = {
  currentUser: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired
};

MessageItem.displayName = 'MessageItem';

const styles = StyleSheet.create({
  textContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.grey
  },
  alignLeft: {
    marginRight: 30
  },
  alignRight: {
    marginLeft: 30
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 5
  },
  text: {
    color: colors.black
  }
});

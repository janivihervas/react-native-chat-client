import React, {Component, PropTypes} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Spinner from './Spinner';
import common, {colors} from '../styles/common';

export default class IndexViewHeader extends Component {
  render() {
    const child = this.props.fetching ? <Spinner /> : null;

    return (
      <View style={[styles.header, common.padding]}>
        <View style={styles.inner}>
          <Text style={styles.headerText}>React Native Chat Client</Text>
        </View>
        <View style={[styles.inner, {alignItems: 'flex-end'}]}>
          {child}
        </View>
      </View>
    );
  }
}

IndexViewHeader.propTypes = {
  fetching: PropTypes.bool.isRequired
};

IndexViewHeader.displayName = 'IndexViewHeader';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: colors.blue
  },
  headerText: {
    color: '#fff'
  },
  inner: {
    justifyContent: 'center'
  }
});

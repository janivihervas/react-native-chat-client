import React, {Component, PropTypes} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Spinner from 'react-native-gifted-spinner';

import common, {colors} from '../styles/common';

export default class IndexViewHeader extends Component {
  render() {
    const spinner = this.props.fetching ? <Spinner color={colors.white} style={styles.spinner}/> : null;

    return (
      <View style={[common.header, common.paddingHorizontal]}>
        <View style={styles.inner}>
          <Text style={common.headerText}>React Native Chat Client</Text>
        </View>
        <View style={[styles.inner, {alignItems: 'flex-end'}]}>
          {spinner}
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
  inner: {
    justifyContent: 'center'
  },
  spinner: {
    height: 25
  }
});

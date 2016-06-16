import React, {Component, PropTypes} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Spinner from './Spinner';

export default class IndexViewHeader extends Component {
  render() {
    const child = this.props.fetching ? <Spinner /> : null;

    return (
      <View style={styles.header}>
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
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: 'rgb(66, 186, 220)'
  },
  headerText: {
    color: '#fff'
  },
  inner: {
    justifyContent: 'center'
  }
});

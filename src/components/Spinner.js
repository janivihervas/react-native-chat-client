import React from 'react';
import {Platform, ProgressBarAndroid, ActivityIndicatorIOS} from 'react-native';

export default class Spinner extends React.Component {
  render() {
    const height = 25;
    if (Platform.OS === 'android') {
      return <ProgressBarAndroid color='#fff' styleAttr='Inverse' style={[{height}]}/>;
    }
    return (
      <ActivityIndicatorIOS
        style={[{height}]}
        color='#fff'
      />
    );
  }
}
Spinner.displayName = 'Spinner';

import 'babel-polyfill';
import React from 'react';
import {Provider} from 'react-redux';
import {AppRegistry, BackAndroid} from 'react-native';

import configureStore from './src/redux/configureStore';
import AppContainer from './src/modules/app/AppContainer';
import {navigate, NAVIGATION} from './src/modules/app/AppState';

const store = configureStore();

class ReactNativeChatClient extends React.Component {
  constructor() {
    super();
    this.navigateBack = this.navigateBack.bind(this);
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.navigateBack);
  }

  navigateBack() {
    const currentView = store.getState().appState.get('currentView');

    if (currentView === NAVIGATION.INDEX_VIEW) {
      return false;
    }

    store.dispatch(navigate(NAVIGATION.INDEX_VIEW));
    return true;
  }

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('ReactNativeChatClient', () => ReactNativeChatClient);

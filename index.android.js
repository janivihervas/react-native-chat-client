import 'babel-polyfill';
import React from 'react';
import {Provider} from 'react-redux';
import {AppRegistry, BackAndroid} from 'react-native';

import configureStore from './src/store/configureStore';
import AppContainer from './src/modules/app/AppContainer';
import {navigate, VIEWS} from './src/state/NavigationState';

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
    const currentView = store.getState().getIn(['navigationState', 'currentView']);

    if (currentView === VIEWS.INDEX_VIEW) {
      return false;
    }

    store.dispatch(navigate(VIEWS.INDEX_VIEW));
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

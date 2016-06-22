import 'babel-polyfill';
import React from 'react';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';

import configureStore from './src/store/configureStore';
import AppContainer from './src/modules/app/AppContainer';

const store = configureStore();

class ReactNativeChatClient extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('ReactNativeChatClient', () => ReactNativeChatClient);

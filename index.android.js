import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {AppRegistry} from 'react-native';

import reducer from './src/redux/reducer';
import AppContainer from './src/modules/AppContainer';

const store = createStore(reducer);

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

import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {AppRegistry, BackAndroid} from 'react-native';

import reducer from './src/redux/reducer';
import AppContainer from './src/modules/app/AppContainer';
import {navigate, NAVIGATION} from './src/modules/app/AppState';

const store = createStore(reducer);

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

    if (currentView === NAVIGATION.THREAD_LIST) {
      return false;
    }

    store.dispatch(navigate(NAVIGATION.THREAD_LIST));
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

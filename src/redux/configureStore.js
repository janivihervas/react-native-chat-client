import {createStore} from 'redux';
import {install} from 'redux-loop';

import reducer from './reducer';

export default function configureStore(initialState) {
  return createStore(
    reducer,
    initialState,
    install()
  );
}

import {createStore, applyMiddleware, compose} from 'redux';
import {install} from 'redux-loop';

import reducer from '../state/reducer';
import middleware from './middleware';

export default function configureStore(initialState) {
  return createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      install()
    )
  );
}

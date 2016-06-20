import {combineReducers} from 'redux-loop';
import {Map} from 'immutable';

import app from '../modules/app/AppState';
import index from '../modules/indexView/IndexViewState';

export default combineReducers(
  {
    app,
    index
  },
  Map(),
  (child, key) => child.get(key),
  (child, key, value) => child.set(key, value)
);

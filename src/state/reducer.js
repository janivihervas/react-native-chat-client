import {combineReducers} from 'redux-loop';
import {Map} from 'immutable';

import app from './AppState';
import navigationState from './NavigationState';
import threads from './ThreadsState';

export default combineReducers(
  {
    app,
    // @NOTE: By convention, the navigation state must live in a subtree called
    //`navigationState`
    navigationState,
    threads
  },
  Map(),
  (child, key) => child.get(key),
  (child, key, value) => child.set(key, value)
);

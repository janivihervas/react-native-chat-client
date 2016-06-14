import {combineReducers} from 'redux';

import appState from '../modules/app/AppState';
import users from './UsersState';
import threads from './ThreadsState';
import messages from './MessagesState';

export default combineReducers({
  appState,
  users,
  threads,
  messages
});

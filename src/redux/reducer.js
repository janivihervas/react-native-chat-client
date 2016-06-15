import {combineReducers} from 'redux';

import appState from '../modules/app/AppState';
import users from './UsersState';
import indexViewState from '../modules/indexView/IndexViewState';
import messages from './MessagesState';

export default combineReducers({
  appState,
  users,
  indexViewState,
  messages
});

import {combineReducers} from 'redux-loop';

import app from '../modules/app/AppState';
import users from './UsersState';
import index from '../modules/indexView/IndexViewState';
import messages from './MessagesState';

export default combineReducers({
  app,
  users,
  index,
  messages
});

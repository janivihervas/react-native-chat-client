import {combineReducers} from 'redux-loop';

import app from '../modules/app/AppState';
import index from '../modules/indexView/IndexViewState';

export default combineReducers({
  app,
  index
});

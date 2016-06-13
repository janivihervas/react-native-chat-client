import {combineReducers} from 'redux';

import AppStateReducer from '../modules/AppState';

export default combineReducers({
  appState: AppStateReducer
});

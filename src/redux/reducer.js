import {combineReducers} from 'redux';

import AppStateReducer from '../modules/app/AppState';

export default combineReducers({
  appState: AppStateReducer
});

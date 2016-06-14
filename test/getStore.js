import {createStore} from 'redux';

import reducer from '../src/redux/reducer';

export default function getStore() {
  return createStore(reducer);
}

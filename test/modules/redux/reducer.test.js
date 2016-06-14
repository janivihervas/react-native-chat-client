import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Map} from 'immutable';

import reducer from '../../../src/redux/reducer';
import {NAVIGATION} from '../../../src/modules/app/AppState';

describe('Reducer', () => {

  it('combined reducers', () => {
    assert.isFunction(reducer);
    assert.deepEqual(reducer(), {
      appState: Map({
        currentView: NAVIGATION.INDEX_VIEW
      })
    });
  });
});

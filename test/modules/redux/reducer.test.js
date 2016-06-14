import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Map} from 'immutable';

import reducer from '../../../src/redux/reducer';

describe('Reducer', () => {

  it('combined reducers', () => {
    assert.isFunction(reducer);
    assert.deepEqual(reducer(), {
      appState: Map({
        currentView: 'thread list'
      })
    });
  });
});

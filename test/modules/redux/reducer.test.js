import {describe, it} from 'mocha';
import {assert} from 'chai';

import reducer from '../../../src/redux/reducer';
import {NAVIGATION} from '../../../src/modules/app/AppState';

describe('Reducer', () => {

  it('combined reducers', () => {
    assert.isFunction(reducer);
    const initialState = reducer();
    assert.isObject(initialState);
    assert.isOk(initialState.appState);
    assert.isOk(initialState.users);
    assert.isOk(initialState.indexViewState);
    assert.isOk(initialState.messages);
    assert.equal(initialState.appState.get('currentView'), NAVIGATION.INDEX_VIEW);
  });
});

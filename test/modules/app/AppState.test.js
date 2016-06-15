import {describe, it, beforeEach} from 'mocha';
import {assert} from 'chai';

import AppStateReducer, {navigate, NAVIGATION} from '../../../src/modules/app/AppState';

describe('AppState', () => {
  let initialState;

  beforeEach(() => {
    initialState = AppStateReducer();
  });

  it('AppStateReducer', () => {
    assert.equal(initialState.get('currentView'), NAVIGATION.INDEX_VIEW);
    assert.isOk(initialState.get('currentUser'));

    assert.equal(initialState, AppStateReducer());
  });

  it('navigate', () => {
    const action = navigate('test');

    assert.isObject(action);
    assert.isString(action.type);
    assert.equal(action.payload, 'test');

    assert.notDeepEqual(initialState, AppStateReducer(initialState, navigate('oifn')));

    assert.equal(AppStateReducer(initialState, navigate('view')).get('currentView'), 'view');
  });
});

import {describe, it, beforeEach} from 'mocha';
import {assert} from 'chai';
import {Map} from 'immutable';

import AppStateReducer, {navigate, NAVIGATION} from '../../../src/modules/app/AppState';

describe('AppState', () => {
  let initialState;

  beforeEach(() => {
    initialState = AppStateReducer();
  });

  it('AppStateReducer', () => {
    assert.deepEqual(initialState, Map({
      currentView: NAVIGATION.INDEX_VIEW
    }));

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

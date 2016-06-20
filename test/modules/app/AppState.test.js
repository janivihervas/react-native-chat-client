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
    assert.equal(initialState.getIn(['currentView', 'view']), NAVIGATION.INDEX_VIEW);
    assert.isOk(initialState.get('currentUser'));

    assert.equal(initialState, AppStateReducer());
  });

  it('navigate', () => {
    const action = navigate('test');

    assert.isObject(action);
    assert.isString(action.type);
    assert.deepEqual(action.payload, Map({view: 'test', id: undefined}));

    assert.notDeepEqual(initialState, AppStateReducer(initialState, navigate('oifn')));

    assert.equal(AppStateReducer(initialState, navigate('view')).getIn(['currentView', 'view']), 'view');
  });
});

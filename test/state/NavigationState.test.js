import {describe, it, beforeEach} from 'mocha';
import {assert} from 'chai';

import NavigationStateReducer, {navigate, VIEWS} from '../../src/state/NavigationState';

describe('AppState', () => {
  let initialState;

  beforeEach(() => {
    initialState = NavigationStateReducer();
  });

  it('NavigationStateReducer', () => {
    assert.equal(initialState.get('currentView'), VIEWS.INDEX_VIEW);

    assert.equal(initialState, NavigationStateReducer());
  });

  it('navigate', () => {
    const action = navigate('test');

    assert.isObject(action);
    assert.isString(action.type);
    assert.deepEqual(action.payload, {view: 'test', threadID: undefined});

    assert.notDeepEqual(initialState, NavigationStateReducer(initialState, navigate('oifn')));

    assert.equal(NavigationStateReducer(initialState, navigate('view')).get('currentView'), 'view');
  });
});

import React from 'react';
import {View, Text} from 'react-native';
import {describe, it} from 'mocha';
import {assert} from 'chai';

/**
 * Asserts that two React Elements are almost the same. Checks only the display name and display names of
 * children. Does NOT assert propTypes, styles, etc. Does NOT assert the deepest child, if it is not
 * a React Element, e.g normal text
 * @param actual Actual
 * @param expected Expected
 */
export function assertReactElements(actual, expected) {
  if (!actual && !expected) {
    return;
  }
  assert.equal(actual.type.displayName, expected.type.displayName, 'display name');

  const actualProps = Object.keys(actual.props).filter(d => d !== 'children' && d !== 'style');
  const expectedProps = Object.keys(expected.props).filter(d => d !== 'children' && d !== 'style');

  assert.deepEqual(actualProps, expectedProps);

  for (let i = 0; i < actualProps.length; i++) {
    assert.deepEqual(
      actual.props[actualProps[i]],
      expected.props[expectedProps[i]]
    );
  }

  /* eslint-disable */
  const actualChildren = Array.isArray(actual.props.children)
    ? actual.props.children
    : typeof actual.props.children === 'object'
    ? [actual.props.children]
    : [];

  const expectedChildren = Array.isArray(expected.props.children)
    ? expected.props.children
    : typeof expected.props.children === 'object'
    ? [expected.props.children]
    : [];
  /* eslint-enable */

  assert.equal(actualChildren.length, expectedChildren.length,
    `Children length:
    actual: ${JSON.stringify(actualChildren, null, 4)}
    
    expected: ${JSON.stringify(expectedChildren, null, 4)}`);

  for (let i = 0; i < actualChildren.length; i++) {
    assertReactElements(actualChildren[i], expectedChildren[i]);
  }
}

describe('Test helpers', () => {
  it('assertReactElements', () => {

    /* eslint-disable */
    let el0 = (
      <View>
        <View someProp={true}>{null}</View>
        <View anotherProp={2}>{}</View>
        <View test={'test'}>{undefined}</View>
      </View>
    );
    /* eslint-enable */

    assert.doesNotThrow(() => {
      assertReactElements(el0, el0);
    });

    el0 = (
      <View>
        <View>
          <View loading={true}>
            <Text/>
          </View>
        </View>
        <View>
          <Text/>
        </View>
      </View>
    );

    assert.doesNotThrow(() => {
      assertReactElements(el0, el0);
    });

    let el1 = (
      <View>
        <View>
          <View loading={true}>
            <Text/>
          </View>
        </View>
        <View>
          <View/>
        </View>
      </View>
    );

    assert.throws(() => {
      assertReactElements(el0, el1);
    });

    el0 = (
      <View>
        <Text loading={false}>oig3rngorng</Text>
      </View>
    );
    el1 = (
      <View>
        <Text loading={true}>ergernenfdfpwef</Text>
      </View>
    );

    assert.throws(() => {
      assertReactElements(el0, el1);
    });

    el1 = (
      <View>
        <Text loading={false}>ergernenfdfpwef</Text>
      </View>
    );

    assert.doesNotThrow(() => {
      assertReactElements(el0, el1);
    });
  });
});

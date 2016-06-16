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

  for (var i = 0; i < actualChildren.length; i++) {
    assertReactElements(actualChildren[i], expectedChildren[i]);
  }
}

describe('Test helpers', () => {
  it('assertReactElements', () => {

    /* eslint-disable */
    let el0 = (
      <View>
        <View>{null}</View>
        <View>{}</View>
        <View>{undefined}</View>
      </View>
    );
    /* eslint-enable */

    assert.doesNotThrow(() => {
      assertReactElements(el0, el0);
    });

    el0 = (
      <View>
        <View>
          <View>
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
          <View>
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
        <Text>oig3rngorng</Text>
      </View>
    );
    el1 = (
      <View>
        <Text>ergernenfdfpwef</Text>
      </View>
    );

    assert.doesNotThrow(() => {
      assertReactElements(el0, el1);
    });
  });
});

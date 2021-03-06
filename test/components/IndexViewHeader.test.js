import React from 'react';
import {View, Text} from 'react-native';
import TestUtils from 'react-addons-test-utils';
import {describe, it, beforeEach} from 'mocha';
import Spinner from 'react-native-gifted-spinner';

import {assertReactElements} from '../helpers';
import IndexViewHeader from '../../src/components/IndexViewHeader';
import {colors} from '../../src/styles/common';

describe('IndexViewHeader', () => {
  let renderer;

  beforeEach(() => {
    renderer = TestUtils.createRenderer();
  });

  it('should render Spinner when fetching data', () => {
    renderer.render((
      <IndexViewHeader fetching={true} />
    ));
    const el = renderer.getRenderOutput();

    assertReactElements(el, (
      <View>
        <View>
          <Text/>
        </View>
        <View>
          <Spinner color={colors.white}/>
        </View>
      </View>
    ));
  });

  it('should not render Spinner when not fetching data', () => {
    renderer.render((
      <IndexViewHeader fetching={false} />
    ));
    const el = renderer.getRenderOutput();

    assertReactElements(el, (
      <View>
        <View>
          <Text/>
        </View>
        <View>
          {[null]}
        </View>
      </View>
    ));
  });
});

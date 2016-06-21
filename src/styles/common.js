import {StyleSheet} from 'react-native';

export const colors = {
  blue: '#42BADC',
  grey: '#DFDFDF',
  black: '#000000',
  white: '#FFFFFF'
};

export const variables = {
  paddingHorizontal: 15,
  paddingVertical: 10
};

const styles = StyleSheet.create({
  fullSize: {
    flex: 1
  },
  paddingHorizontal: {
    paddingLeft: variables.paddingVertical,
    paddingRight: variables.paddingVertical
  },
  paddingVertical: {
    paddingTop: variables.paddingVertical,
    paddingBottom: variables.paddingVertical
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: colors.blue
  },
  headerText: {
    color: colors.white
  }
});

export default styles;

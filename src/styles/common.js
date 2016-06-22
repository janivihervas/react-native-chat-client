import {StyleSheet} from 'react-native';

export const colors = {
  blue: '#42BADC',
  grey: '#DFDFDF',
  black: '#000000',
  white: '#FFFFFF'
};

export const variables = {
  padding: 20
};

const styles = StyleSheet.create({
  fullSize: {
    flex: 1
  },
  paddingHorizontal: {
    paddingLeft: variables.padding,
    paddingRight: variables.padding
  },
  paddingVertical: {
    paddingTop: variables.padding,
    paddingBottom: variables.padding
  },
  list: {
    paddingLeft: variables.padding,
    paddingRight: variables.padding
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

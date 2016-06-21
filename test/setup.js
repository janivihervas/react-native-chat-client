global.__DEV__ = false;

require('babel-register')({
  // ignore node_modules except node_modules/react-native-vector-icons because it needs to be babelified
  ignore: /node_modules\/(?!(react-native-vector-icons|react-native-gifted-spinner))/
});

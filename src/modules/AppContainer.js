import {connect} from 'react-redux';

import App from './App';

export default connect(
  state => ({
    navigation: state.get('navigation')
  })
)(App);

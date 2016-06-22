import React, {Component, PropTypes} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import common, {variables} from '../styles/common';

export default class MessageInput extends Component {
  constructor() {
    super();

    this.onTextChange = this.onTextChange.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      message: '',
      height: 0
    };
  }

  onTextChange(event) {
    this.setState({
      message: event.nativeEvent.text,
      height: event.nativeEvent.contentSize.height
    });
  }

  submit() {
    if (this.state.message.length === 0) {
      return;
    }

    dismissKeyboard();
    this.props.submit(this.state.message);
    this.setState({
      message: '',
      height: 0
    });
  }

  render() {
    const height = Math.max(40, this.state.height);
    const icon = this.state.message.length > 0
      ? <MaterialIcons style={styles.icon} name='send' size={20} onPress={this.submit}/>
      : null;

    return (
      <View style={[styles.container, common.paddingHorizontal, {height: height + 10}]}>
        <TextInput
          multiline={true}
          style={[styles.input, {height}]}
          value={this.state.message}
          onChange={this.onTextChange}
        />
        {icon}
      </View>
    );
  }
}

MessageInput.displayName = 'MessageInput';

MessageInput.propTypes = {
  submit: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1
  },
  input: {
    flex: 1,
    borderBottomWidth: 1
  },
  icon: {
    marginLeft: variables.padding
  }
});

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';

class BackButton extends React.Component {
  render() {
    return (
      <Icon
        name='chevron-circle-left'
        type='font-awesome'
        color='#fff'
        size={26}
        onPress={() => Actions.pop()}
      />
    )
  }
}

export default BackButton;

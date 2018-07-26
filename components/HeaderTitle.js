import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';

class HeaderTitle extends React.Component {
  render() {
    return (
      <View style={{ marginTop: 25 }}>
        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Pay Me Connor</Text>
        <Text style={{ textAlign: 'center', color: '#fff' }}>{Actions.currentScene}</Text>
      </View>
    )
  }
}

export default HeaderTitle;

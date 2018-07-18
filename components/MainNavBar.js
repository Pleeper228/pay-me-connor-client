import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import Menu from '../components/Menu'

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF584B',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

class MainNavBar extends React.Component {
  render() {
    return (
      <Header
        rightComponent={<Menu />}
        centerComponent={{ text: 'Pay Me Connor', style: { color: '#fff' } }}
        backgroundColor='#FF584B'
      />
    )
  }
}

export default MainNavBar;

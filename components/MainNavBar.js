import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import Menu from '../components/Menu'
import BackButton from './BackButton'
import HeaderTitle from './HeaderTitle'

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
        leftComponent={<BackButton />}
        rightComponent={<Menu />}
        centerComponent={<HeaderTitle />}
        backgroundColor='#FF584B'
      />
    )
  }
}

export default MainNavBar;

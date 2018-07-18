import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import Menu from '../components/Menu'

class MainNavBar extends React.Component {
  render() {
    return (
      <Header
        rightComponent={<Menu />}
        centerComponent={{ text: 'Pay Me Connor', style: { color: '#fff' } }}
        backgroundColor='#000'
      />
    )
  }
}

export default MainNavBar;

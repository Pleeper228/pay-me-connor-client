import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements'

const BillsScreen = () => {
  return (
    <List>
  {
    list.map((item, i) => (
      <ListItem
        key={i}
        title={item.title}
        leftIcon={{name: item.icon}}
      />
    ))
  }
</List>
  );
}

const list = [
  {
    title: 'Bill 1',
    icon: 'av-timer'
  },
  {
    title: 'Bill 2',
    icon: 'flight-takeoff'
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default BillsScreen;

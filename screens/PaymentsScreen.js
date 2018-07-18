import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements'

const PaymentsScreen = () => {
  return (
    <List>
      {
        list.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            leftIcon={{type: 'font-awesome', name: 'dollar'}}
          />
        ))
      }
    </List>
  );
}

const list = [
  {
    title: 'Payment 1'
  },
  {
    title: 'Payment 2'
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

export default PaymentsScreen;

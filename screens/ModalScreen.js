import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem } from 'react-native-elements'

const Modal = () => {
  return (
    <List>
      {
        list.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            hideChevron
            onPress={Actions[item.actionName]}
          />
        ))
      }
    </List>
  );
}

const list = [
  {
    title: 'Homes',
    actionName: 'home'
  },
  {
    title: 'Sign Out',
    actionName: 'login'
  },
]


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8200',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default Modal;

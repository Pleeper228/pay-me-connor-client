import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem, Card } from 'react-native-elements'

const RoommateScreen = (props) => {
  return (
    <Card title={'Bills for ' + props.roommate.name}>
      <List>
        {
          list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{name: item.icon}}
              hideChevron
            />
          ))
        }
      </List>
    </Card>
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
    backgroundColor: '#000000',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default RoommateScreen;

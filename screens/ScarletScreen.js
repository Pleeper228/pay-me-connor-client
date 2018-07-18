import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem, Card, Button } from 'react-native-elements'


const PaymentsScreen = () => {
  return (
    <ScrollView>
      {
        list.map((item, i) => (
          <View key={i}>
            <Card
              key={i}
              title={item.title}
              image={require('../assets/pay-me-connor-icon-1.png')}
              imageStyle={{ height: 250 }}
            >
              <ListItem
                key={i}
                title={item.title}
                onPress={() => Actions.roommatesTab()}
              />
            </Card>
          </View>
        ))
      }
    </ScrollView>
  );
}

const list = [
  {
    title: 'Test House'
  },
  {
    title: 'Test House'
  }
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

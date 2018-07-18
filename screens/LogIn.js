import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'

class LogIn extends React.Component {
  logIn() {
    Actions.home()
  }

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Email</FormLabel>
        <FormInput containerStyle={styles.inputContainer} />
        <FormLabel>Password</FormLabel>
        <FormInput containerStyle={styles.inputContainer} />
        <Button buttonStyle={styles.buttonStyle} onPress={this.logIn} title='Log In'/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: 50
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  input: {
    textAlign: 'center'
  },
  inputContainer: {
    width: '80%'
  },
  buttonStyle: {
    backgroundColor: '#FF796F',
    width: '100%',
    borderRadius: 10,
    marginTop: 10
  }
});

export default LogIn;

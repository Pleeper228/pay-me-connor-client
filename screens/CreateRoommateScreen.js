import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'

const roommatesURL = 'http://localhost:3000/api/v1/houses/current/roommates'

class CreateRoommate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roommateName: ''
    }
    this.onValueChangeName = this.onValueChangeName.bind(this)
  }

  onValueChangeName(value: string) {
    this.setState({
      roommateName: value
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Roommate Name</FormLabel>
        <FormInput containerStyle={styles.inputContainer} onChangeText={this.onValueChangeName}/>
        <Button buttonStyle={styles.buttonStyle} onPress={() => this.props.createRoommate(this.state.roommateName)} title='Add Roommate' />
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
    paddingTop: 40
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
    marginTop: 20
  }
});

export default CreateRoommate;

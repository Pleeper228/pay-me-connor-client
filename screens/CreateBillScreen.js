import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'

const billsURL = 'http://localhost:3000/api/v1/houses/current/bills'

class CreateBillScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      billName: '',
      billAmount: null
    }
    this.onValueChangeName = this.onValueChangeName.bind(this)
    this.onValueChangeAmount = this.onValueChangeAmount.bind(this)
  }

  onValueChangeName(value: string) {
    this.setState({
      billName: value
    })
  }

  onValueChangeAmount(value: string) {
    this.setState({
      billAmount: value
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Bill Name</FormLabel>
        <FormInput containerStyle={styles.inputContainer} onChangeText={this.onValueChangeName}/>
        <FormLabel>Bill Amount</FormLabel>
        <FormInput containerStyle={styles.inputContainer} keyboardType="number-pad" placeholder='Example: 50.00' containerStyle={styles.inputContainer} onChangeText={this.onValueChangeAmount}/>
        <Button buttonStyle={styles.buttonStyle} onPress={() => this.props.createBill(this.state.billName, this.state.billAmount)} title='Add Bill' />
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

export default CreateBillScreen;

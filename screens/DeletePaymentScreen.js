import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FormLabel, FormInput, FormValidationMessage, Button, Card } from 'react-native-elements'

class DeletePaymentScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.paymentId)
    return (
      <Card style={styles.container}>
        <Text style={styles.text} >Are you sure you want to delete this payment?</Text>
        <Button buttonStyle={styles.confirmButtonStyle} onPress={() => this.props.deletePayment(this.props.paymentId)} title='Delete Payment' />
        <Button buttonStyle={styles.cancelButtonStyle} onPress={() => Actions.pop()} title='Cancel' />
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: '#666'
  },
  confirmButtonStyle: {
    backgroundColor: 'red',
    width: '100%',
    borderRadius: 10,
    marginTop: 20
  },
  cancelButtonStyle: {
    backgroundColor: '#FF796F',
    width: '100%',
    borderRadius: 10,
    marginTop: 20
  }
});

export default DeletePaymentScreen;

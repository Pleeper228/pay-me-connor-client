import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';

class ListPayment extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Text style={{ marginLeft: '4%', fontSize: 16 }}>
        {this.props.payment.roommate_name}
        <Text style={{ color: '#00c9a4', fontWeight: 'bold' }}> paid </Text>
        ${this.props.payment.amount}
      </Text>
    )
  }
}

export default ListPayment;

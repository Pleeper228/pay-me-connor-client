import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Input } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { FormLabel, FormInput, FormValidationMessage, Button, Icon } from 'react-native-elements'
import { Container, Header, Content, Form, Item, Picker } from 'native-base';

const roommatesURL = 'http://localhost:3000/api/v1/houses/current/roommates'

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
    width: '50%'
  },
  buttonStyle: {
    backgroundColor: '#FF796F',
    width: '100%',
    borderRadius: 10,
    marginTop: 20
  }
});

class CreatePayment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roommateId: 0,
      roommateName: '',
      billId: 0,
      amount: null
    }
    this.onValueChangeRoommate = this.onValueChangeRoommate.bind(this)
    this.onValueChangeBill = this.onValueChangeBill.bind(this)
    this.onValueChangeAmount = this.onValueChangeAmount.bind(this)
  }

  onValueChangeRoommate(value: string) {
    this.setState({
      roommateId: value
    })
  }

  onValueChangeBill(value: string) {
    this.setState({
      billId: value
    })
  }

  onValueChangeAmount(value: string) {
    this.setState({
      amount: value
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Form> */}
        <FormLabel>Who's Paying?</FormLabel>
        <Item picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon type='ionicon' name="ios-arrow-down-outline" />}
            style={{ width: "auto" }}
            placeholder="Select one"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.roommateId}
            onValueChange={this.onValueChangeRoommate.bind(this)}
          >
            {
              this.props.roommates.map(roommate => {
                return <Picker.Item key={roommate.id} label={roommate.name} value={roommate.id}/>
              })
            }
          </Picker>
        </Item>
        <FormLabel>Which Bill?</FormLabel>
        <Item picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon type='ionicon' name="ios-arrow-down-outline" />}
            style={{ width: "auto" }}
            placeholder="Select one"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.billId}
            onValueChange={this.onValueChangeBill.bind(this)}
          >
            {
              this.props.bills.map(bill => {
                return <Picker.Item key={bill.id} label={bill.name} value={bill.id}/>
              })
            }
          </Picker>
        </Item>
          {/* </Form> */}
        <FormLabel>Payment Amount</FormLabel>
        <Icon containerStyle={{ marginTop: 20 }} type='font-awesome' size={20} color='#666' name={'dollar'} />
        <FormInput containerStyle={styles.inputContainer} keyboardType="number-pad" placeholder='Example: 50.00' containerStyle={styles.inputContainer} onChangeText={this.onValueChangeAmount}/>
        <Button buttonStyle={styles.buttonStyle} onPress={() => this.props.createPayment(this.state.roommateId, this.state.billId, this.state.amount)} title='Add Payment' />
      </View>
    )
  }
}



export default CreatePayment;

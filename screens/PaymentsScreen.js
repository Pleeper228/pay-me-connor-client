import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem, Card, Button, Icon } from 'react-native-elements'

const billsURL = 'http://localhost:3000/api/v1/houses/current/bills'
const roommatesURL = 'http://localhost:3000/api/v1/houses/current/roommates'
const paymentsURL = 'http://localhost:3000/api/v1/houses/current/payments'

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#FF796F',
    width: '100%',
    borderRadius: 10,
    marginTop: 20
  }
});

class PaymentsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bills: [],
      roommates: []
    }
    this.renderBills = this.renderBills.bind(this)
    this.createPayment = this.createPayment.bind(this)
  }

  componentDidMount() {
    fetch(billsURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          bills: res
        })
      })

    fetch(roommatesURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          roommates: res
        })
      })
  }

  createPayment(roommateId, billId, amount) {
    fetch(paymentsURL, {
      method: 'POST',
      body: JSON.stringify({
        "roommate_id": roommateId,
        "bill_id": billId,
        "amount": parseFloat(amount)
      }),
      headers: new Headers({"Content-Type": "application/json"})
    })
      .then(res => res.json())
      .then(res => {
        let currentRoommate = this.state.roommates.filter(roommate => res.roommate_id === roommate.id)[0]
        res.roommate_name = currentRoommate.name
        let currentBills = this.state.bills
        currentBills.forEach(bill => {
          if (bill.id === res.bill_id) {
            bill.payments.push(res)
          }
        })
        this.setState({
          bills: currentBills
        })
      })
      .then(Actions.pop())
      .catch(err => {
        console.error(err)
      })
  }

  click() {

  }

  renderBills() {
    return (
      <ScrollView>
        <Button buttonStyle={styles.buttonStyle} onPress={() => Actions.createPayment({roommates: this.state.roommates, bills: this.state.bills, createPayment: this.createPayment})} title='Add Payment' />
        {
          this.state.bills.map((bill, i) => (
            <Card key={i} title={bill.name}>
              {bill.payments.map((payment, i) => {
                console.log(payment.id)
                let date = new Date(payment.created_at);
                let formatedDate = (date.getMonth()+1) + '-' + date.getDate() + '-' + date.getFullYear();
                return (
                  <ListItem
                    key={'payment' + i}
                    roundAvatar
                    avatar={require('../assets/pay-me-connor-icon-1.png')}
                    title={payment.roommate_name + ' paid $' + payment.amount}
                    subtitle={formatedDate}
                    onPressRightIcon={() => Actions.deletePayment({ paymentId: 'butts' })}
                    rightIcon={{name: 'delete', color: '#a6a6a6', type: 'material-community'}}
                  />
                )
              })}
            </Card>
          ))
        }
      </ScrollView>
    )
  }

  render() {
    return (
      <View>
        { this.renderBills() }
      </View>
    )
  }
}

export default PaymentsScreen;

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem, Card, Button, Icon } from 'react-native-elements'
import ListPayment from '../components/ListPayment'

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#FF796F',
    width: '100%',
    borderRadius: 10,
    marginTop: 20
  }
});

class PaymentsScreen extends Component {
  renderBills() {
    return (
      <ScrollView>
        <Button buttonStyle={styles.buttonStyle} onPress={() => Actions.createPayment()} title='Add Payment' />
        {
          this.props.bills.map((bill, i) => (
            <Card key={i} title={bill.name}>
              {bill.payments.map((payment, i) => {
                let date = new Date(payment.created_at);
                let formatedDate = (date.getMonth()+1) + '-' + date.getDate() + '-' + date.getFullYear();
                return (
                  <ListItem
                    key={'payment' + i}
                    roundAvatar
                    avatar={this.props.getPic(payment.roommate_name)}
                    title={<ListPayment payment={payment} />}
                    subtitle={formatedDate}
                    onPressRightIcon={() => Actions.deletePayment({ paymentId: payment.id, deletePayment: this.props.deletePayment })}
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

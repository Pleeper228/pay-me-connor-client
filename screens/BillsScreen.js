import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem, Card, Button } from 'react-native-elements'

const billsURL = 'http://localhost:3000/api/v1/houses/current/bills'

class BillsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bills: []
    }
  }

  render() {
    return (
      <ScrollView>
        <Button buttonStyle={styles.buttonStyle} onPress={() => Actions.createBill({ createBill: this.props.createBill })} title='Add Bill' />
        <Card>
          {
            this.props.bills.map((bill, i) => {
              let date = new Date(bill.created_at);
              let formatedDate = (date.getMonth()+1) + '-' + date.getFullYear();
              return <ListItem
                key={i}
                title={bill.name}
                rightTitle={formatedDate}
                rightTitleStyle={{ color: '#666' }}
                hideChevron
              />
            })
          }
        </Card>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#FF796F',
    width: '100%',
    borderRadius: 10,
    marginTop: 20
  }
});

export default BillsScreen;

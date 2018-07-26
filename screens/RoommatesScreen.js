import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem, Button, Card } from 'react-native-elements'

const roommatesURL = 'http://localhost:3000/api/v1/houses/current/roommates'

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#FF796F',
    width: '100%',
    borderRadius: 10,
    marginTop: 20
  }
});

class RoommatesScreen extends Component {
  totalBills() {
    let allTotalBills = this.props.bills.reduce((total, bill) => {
      let totalMinusValue = 0
      bill.payments.forEach(payment => {
        let foundMatch = false
        this.props.roommates.forEach(roommate => {
          if (payment.roommate_id === roommate.id) {
            foundMatch = true
          }
        })
        if (!foundMatch) {
          totalMinusValue += payment.amount
        }
      })
      total += bill.amount
      total -= totalMinusValue
      return total
    }, 0)
    let totalBillsPerPerson = allTotalBills / this.props.roommates.length
    return totalBillsPerPerson
  }

  render() {
    return (
      <ScrollView>
        <Button buttonStyle={styles.buttonStyle} onPress={() => Actions.createRoommate({ createRoommate: this.props.createRoommate })} title='Add Roommate' />
        <Card>
          {
            this.props.roommates.map((roommate, i) => {
              return <ListItem
                roundAvatar
                avatar={require('../assets/pay-me-connor-icon-1.png')}
                key={i}
                title={roommate.name}
                rightTitle={'owes $' + (this.totalBills() - roommate.amount_paid).toFixed(2).toString()}
                rightTitleStyle={{ color: '#666' }}
                rightIcon={{name: 'delete', color: '#a6a6a6', type: 'material-community'}}
                onPressRightIcon={() => Actions.archiveRoommate({ roommateId: roommate.id, archiveRoommate: this.props.archiveRoommate })}
                onPress={() => Actions.roommate({roommate: roommate})}
              />
            })
          }
        </Card>
      </ScrollView>
    )
  }
}

export default RoommatesScreen;

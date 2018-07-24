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
  constructor(props) {
    super(props)
    this.state = {
      roommates: []
    }
    this.createRoommate = this.createRoommate.bind(this)
  }

  componentDidMount() {
    fetch(roommatesURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          roommates: res
        })
      })
  }

  totalBills() {
    let allTotalBills = this.props.bills.reduce((total, bill) => {
      total += bill.amount
      return total
    }, 0)
    let totalBillsPerPerson = allTotalBills / this.state.roommates.length
    return totalBillsPerPerson
  }

  createRoommate(roommateName) {
    fetch(roommatesURL, {
      method: 'POST',
      body: JSON.stringify({
        "name": roommateName
      }),
      headers: new Headers({"Content-Type": "application/json"})
    })
      .then(res => res.json())
      .then(res => {
        let currentRoommates = this.state.roommates
        res.amount_paid = 0
        currentRoommates.push(res)
        this.setState({
          roommates: currentRoommates
        })
      })
      .then(Actions.pop())
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    return (
      <ScrollView>
        <Button buttonStyle={styles.buttonStyle} onPress={() => Actions.createRoommate({ createRoommate: this.createRoommate })} title='Add Roommate' />
        <Card>
          {
            this.state.roommates.map((roommate, i) => {
              return <ListItem
                roundAvatar
                avatar={require('../assets/pay-me-connor-icon-1.png')}
                key={i}
                title={roommate.name}
                rightTitle={'owes $' + (this.totalBills() - roommate.amount_paid).toFixed(2).toString()}
                rightTitleStyle={{ color: '#666' }}
                hideChevron
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

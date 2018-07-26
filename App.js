import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene, Actions, Drawer } from 'react-native-router-flux'
import LogIn from './screens/LogIn'
import ScarletScreen from './screens/ScarletScreen'
import PaymentsScreen from './screens/PaymentsScreen'
import RoommatesScreen from './screens/RoommatesScreen'
import RoommateScreen from './screens/RoommateScreen'
import CreateRoommateScreen from './screens/CreateRoommateScreen'
import CreatePaymentScreen from './screens/CreatePaymentScreen'
import CreateBillScreen from './screens/CreateBillScreen'
import DeletePaymentScreen from './screens/DeletePaymentScreen'
import ArchiveRoommateScreen from './screens/ArchiveRoommateScreen'
import BillsScreen from './screens/BillsScreen'
import ModalScreen from './screens/ModalScreen'
import MainNavBar from './components/MainNavBar'
import InitialNavBar from './components/InitialNavBar'
import { Icon } from 'react-native-elements'

const billsURL = 'http://localhost:3000/api/v1/houses/current/bills/'
const paymentsURL = 'http://localhost:3000/api/v1/houses/current/payments/'
const roommatesURL = 'http://localhost:3000/api/v1/houses/current/roommates/'

const TabIcon = ({ name, size }) => {
  return (
    <Icon type='font-awesome' size={size} color='#666' name={name} />
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      payments: [],
      bills: [],
      roommates: [],
    }
    this.createBill = this.createBill.bind(this)
    this.createRoommate = this.createRoommate.bind(this)
    this.createPayment = this.createPayment.bind(this)
    this.deletePayment = this.deletePayment.bind(this)
    this.archiveRoommate = this.archiveRoommate.bind(this)
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
        let currentRoommates = this.state.roommates
        let currentRoommate = this.state.roommates.filter(roommate => res.roommate_id === roommate.id)[0]
        currentRoommate.amount_paid += res.amount
        currentRoommates.splice(currentRoommates.indexOf(currentRoommate), 1)
        currentRoommates.unshift(currentRoommate)
        res.roommate_name = currentRoommate.name
        let currentBills = this.state.bills
        currentBills.forEach(bill => {
          if (bill.id === res.bill_id) {
            bill.payments.push(res)
          }
        })
        this.setState({
          bills: currentBills,
          roommates: currentRoommates
        })
      })
      .then(Actions.pop())
      .catch(err => {
        console.error(err)
      })
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

  createBill(billName, billAmount) {
    fetch(billsURL, {
      method: 'POST',
      body: JSON.stringify({
        "name": billName,
        "amount": parseFloat(billAmount)
      }),
      headers: new Headers({"Content-Type": "application/json"})
    })
      .then(res => res.json())
      .then(res => {
        let currentBills = this.state.bills
        currentBills.push(res)
        this.setState({
          bills: currentBills
        })
      })
      .then(Actions.pop())
      .catch(err => {
        console.error(err)
      })
  }

  deletePayment(payment_id) {
    fetch(paymentsURL + payment_id, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        let currentBills = this.state.bills
        let currentRoommates = this.state.roommates
        currentBills.forEach(bill => {
          bill.payments.forEach((payment, i) => {
            if (payment.id === payment_id) {
              bill.payments.splice(i, 1)
              currentRoommates.forEach(roommate => {
                if (payment.roommate_id === roommate.id) {
                  roommate.amount_paid -= payment.amount
                }
              })
            }
          })
        })
        this.setState({
          bills: currentBills,
          roommates: currentRoommates
        })
      })
      .then(Actions.pop())
  }

  archiveRoommate(roommate_id) {
    fetch(roommatesURL + roommate_id, {
      method: 'PATCH',
      body: JSON.stringify({
        archived: true
      }),
      headers: new Headers({"Content-Type": "application/json"})
    })
      .then(res => res.json())
      .then(res => {
        let currentRoommates = this.state.roommates
        currentRoommates.forEach((roommate, i) => {
          if (res.id === roommate.id) {
            currentRoommates.splice(i, 1)
            this.setState({
              roommates: currentRoommates
            })
          }
        })
      })
      .then(Actions.pop())
  }

  getPic(name) {
    if (name === 'Connor') {
      return require('./assets/connor.jpg')
    } else if (name === 'Audrey') {
      return require('./assets/audrey.jpg')
    } else if (name === 'Charlotte') {
      return require('./assets/charlotte.jpg')
    } else {
      return require('./assets/pay-me-connor-icon-2.png')
    }
  }

  render() {
    return (
      <Router navBar={MainNavBar} >
        <Scene key='root'>
          <Scene key='login' gesturesEnabled={false} component={LogIn} />
          <Drawer key='modal' drawerWidth={30} component={ModalScreen} title='Modal' />
          <Scene key="home" gesturesEnabled={false} title="Home" name='home' component={ScarletScreen} />
          <Scene key='tab-bar' tabBarStyle={{ backgroundColor: '#f2f2f2' }} tabs modal>
            <Scene key="paymentsTab" hideNavBar size={22} name='dollar' title="Payments" icon={TabIcon}>
              <Scene key='payments' component={() => <PaymentsScreen bills={this.state.bills} deletePayment={this.deletePayment} getPic={this.getPic} />} backTitle='Back' title='Black' />
              <Scene key='createPayment' component={() => <CreatePaymentScreen roommates={this.state.roommates} bills={this.state.bills} createPayment={this.createPayment} />} backTitle='Back' title='Add Payment' />
              <Scene key='deletePayment' component={DeletePaymentScreen} backTitle='Back' title='Delete Payment' />
            </Scene>
            <Scene key="roommatesTab" hideNavBar size={20} name='users' title="Roommates" icon={TabIcon}>
              <Scene key='roommates' component={() => <RoommatesScreen bills={this.state.bills} roommates={this.state.roommates} createRoommate={this.createRoommate} archiveRoommate={this.archiveRoommate} getPic={this.getPic} />} backTitle='Back' title='Roommates' />
              <Scene key='roommate' component={RoommateScreen} backTitle='Back' title='Roommate' />
              <Scene key='createRoommate' component={CreateRoommateScreen} title='Add Roommate' />
              <Scene key='archiveRoommate' component={ArchiveRoommateScreen} title='Delete Roommate' />
            </Scene>
            <Scene key="bills" hideNavBar size={23}  name='envelope' title="Bills" icon={TabIcon}>
              <Scene key='bills' component={() => <BillsScreen bills={this.state.bills} createBill={this.createBill} />}  backTitle='Back' title='Black' />
              <Scene key='createBill' component={CreateBillScreen} backTitle='Back' title='Blue' />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}

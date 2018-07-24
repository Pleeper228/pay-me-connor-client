import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux'
import LogIn from './screens/LogIn'
import ScarletScreen from './screens/ScarletScreen'
import PaymentsScreen from './screens/PaymentsScreen'
import RoommatesScreen from './screens/RoommatesScreen'
import RoommateScreen from './screens/RoommateScreen'
import CreateRoommateScreen from './screens/CreateRoommateScreen'
import CreatePaymentScreen from './screens/CreatePaymentScreen'
import CreateBillScreen from './screens/CreateBillScreen'
import DeletePaymentScreen from './screens/DeletePaymentScreen'
import BillsScreen from './screens/BillsScreen'
import ModalScreen from './screens/ModalScreen'
import MainNavBar from './components/MainNavBar'
import InitialNavBar from './components/InitialNavBar'
import { Icon } from 'react-native-elements'


const billsURL = 'http://localhost:3000/api/v1/houses/current/bills/'
const paymentsURL = 'http://localhost:3000/api/v1/houses/current/payments/'

const TabIcon = ({ name, size }) => {
  return (
    <Icon type='font-awesome' size={size} color='#666' name={name} />
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bills: [],
      roommates: [],
    }
    this.createBill = this.createBill.bind(this)
  }

  componentDidMount() {
    fetch(billsURL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          bills: res
        })
      })
  }

  createBill(billName, billAmount) {
    console.log('clicked')
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
    console.log(payment_id)
    fetch(paymentsURL + payment_id, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        return res
      })
      .then(Actions.pop())
  }

  render() {
    return (
      <Router navBar={MainNavBar} >
        <Scene key='root'>
          <Scene key='login' gesturesEnabled={false} component={LogIn} />
          <Scene key='modal' component={ModalScreen} title='Modal' />
          <Scene key="home" gesturesEnabled={false} title="Home" name='home' component={ScarletScreen} />
          <Scene key='tab-bar' tabBarStyle={{ backgroundColor: '#f2f2f2' }} tabs modal>
            <Scene key="paymentsTab" hideNavBar size={22} name='dollar' title="Payments" icon={TabIcon}>
              <Scene key='payments' component={PaymentsScreen} backTitle='Back' title='Black' />
              <Scene key='createPayment' component={CreatePaymentScreen} backTitle='Back' title='Add Payment' />
              <Scene key='deletePayment' component={DeletePaymentScreen} backTitle='Back' title='Delete Payment' />
            </Scene>
            <Scene key="roommatesTab" hideNavBar size={20} name='users' title="Roommates" icon={TabIcon}>
              <Scene key='roommates' component={() => <RoommatesScreen bills={this.state.bills} />} backTitle='Back' title='Roommates' />
              <Scene key='roommate' component={RoommateScreen} backTitle='Back' title='Roommate' />
              <Scene key='createRoommate' component={CreateRoommateScreen} title='Add Roommate' />
            </Scene>
            <Scene key="bills" hideNavBar size={23}  name='envelope' title="Bills" icon={TabIcon}>
              <Scene key='bills' component={() => <BillsScreen bills={this.state.bills} createBill={this.createBill} />} backTitle='Back' title='Black' />
              <Scene key='createBill' component={CreateBillScreen} backTitle='Back' title='Blue' />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}

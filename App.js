import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene } from 'react-native-router-flux'
import LogIn from './screens/LogIn'
import ScarletScreen from './screens/ScarletScreen'
import PaymentsScreen from './screens/PaymentsScreen'
import RoommatesScreen from './screens/RoommatesScreen'
import BillsScreen from './screens/BillsScreen'
import ModalScreen from './screens/ModalScreen'
import MainNavBar from './components/MainNavBar'
import InitialNavBar from './components/InitialNavBar'
import { Icon } from 'react-native-elements'


const TabIcon = ({ name, size }) => {
  return (
    <Icon type='font-awesome' size={size} color='#666' name={name} />
  );
}

export default class App extends React.Component {
  render() {
    return (
      <Router navBar={MainNavBar} >
        <Scene key='root'>
          <Scene key='login' gesturesEnabled={false} component={LogIn} />
          <Scene key='modal' component={ModalScreen} title='Modal' />
          <Scene key="home" gesturesEnabled={false} title="Home" name='home' component={ScarletScreen} />
          <Scene key='tab-bar' tabBarStyle={{ backgroundColor: '#f2f2f2' }} tabs modal>
            <Scene key="roommatesTab" hideNavBar size={20} name='users' title="Roommates" icon={TabIcon}>
              <Scene key='roommates' component={RoommatesScreen} backTitle='Back' title='Roommates' />
              <Scene key='blue' component={BillsScreen} backTitle='Back' title='Blue' />
            </Scene>
            <Scene key="bills" hideNavBar size={23}  name='envelope' title="Bills" icon={TabIcon}>
              <Scene key='black' component={BillsScreen} backTitle='Back' title='Black' />
              <Scene key='blue' component={BillsScreen} backTitle='Back' title='Blue' />
            </Scene>
            <Scene key="payments" hideNavBar size={22} name='dollar' title="Payments" icon={TabIcon}>
              <Scene key='black' component={PaymentsScreen} backTitle='Back' title='Black' />
              <Scene key='blue' component={BillsScreen} backTitle='Back' title='Blue' />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}

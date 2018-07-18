import React from 'react'
import { Icon } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';

class Menu extends React.Component {
  toggleMenu() {
    Actions.modal()
  }

  render() {
    return (
      <Icon onPress={this.toggleMenu} name='menu' color='#fff'/>
    )
  }
}

export default Menu;

import React from 'react'
import styles from '../styles'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Container, Text, Button, Content } from 'native-base';
import UserHeader from '../user//UserHeader'
import { logout } from '../../actions'

class Logout extends React.PureComponent {
  componentDidMount() {
    this.props.logout(() => this.props.navigation.navigate('AuthLoading'))
  }
  render () {
    return null
  }
}

export default connect(({user}) => ({user}), {logout})(Logout)
import React from 'react';
import styles from '../styles'
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import { login } from '../../actions'
import { Container, Text, Button, Content } from 'native-base';
import AuthHeader from './AuthHeader'
class LoginScreen extends React.Component {
  componentDidMount () {
    this._signInAsync()
  }

  render() {
    return null
  }

  _signInAsync = () => {
    this.props.login(() => {
      this.props.navigation.navigate('User');
    })
  };
}

export default connect(() => ({}), {login})(LoginScreen)
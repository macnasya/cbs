import React from 'react';
import styles from '../styles'
import { AsyncStorage } from 'react-native';
import { Container, Text, Button, Content } from 'native-base';
import AuthHeader from './AuthHeader'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <Container style={styles.container}>
        <AuthHeader {...this.props} title="Login" />
        <Content>
          <Button onPress={this._signInAsync}>
            <Text>Login</Text>
          </Button>
          <Text>Or</Text>
          <Button onPress={this._singUp}>
            <Text>Sign up</Text>
          </Button>
        </Content>
      </Container>
    );
  }

  _singUp = () => {
    this.props.navigation.navigate('SignUp')
  }
  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('User');
  };
}

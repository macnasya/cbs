import React from 'react';
import styles from '../styles'
import { Container, Text, Content } from 'native-base';
import AuthHeader from './AuthHeader'

export default class SignupScreen extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <AuthHeader {...this.props} title="Login" />
        <Content>
          <Text>SignUp</Text>
        </Content>
      </Container>
    );
  }
}

import React from 'react';
import styles from '../styles'
import { StatusBar } from 'react-native'
import { Container, Content, Text, Button, Icon } from 'native-base';
import PublicHeader from './PublicHeader'

export default class HomeScreen extends React.Component {
    render() {
    return (
      <Container style={styles.container}>
        <PublicHeader {...this.props} title="Welcome" />
        <StatusBar barStyle="light-content" />
        <Content>
          <Text>Public page.</Text>
          <Button block onPress={() => this.props.navigation.navigate('Login')}>
            <Text>Login</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

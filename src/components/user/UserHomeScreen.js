import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { Container, Text, Button } from 'native-base';
import UserHeader from './UserHeader'

export class UserHomeScreen extends React.Component {

  render() {
    return (
      <Container style={styles.container}>
        <UserHeader {...this.props} title="Welcome back"/>
        <Text>User home.</Text>
      </Container>
    );
  }

}

export default connect(({user}) => ({user}))(UserHomeScreen)
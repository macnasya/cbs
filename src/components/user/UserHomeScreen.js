import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { Container, Text, Button, Content } from 'native-base';
import UserHeader from './UserHeader'

class UserHomeScreen extends React.Component {

  render() {
    return (
      <Container style={styles.container}>
        {this.props.user.profile && <Content>
          <UserHeader {...this.props} title="Welcome back"/>
          <Text>User home.</Text>
          <Text>{this.props.user.profile.email}</Text>
        </Content>}
      </Container>
    );
  }

}

export default connect(({user}) => ({user}))(UserHomeScreen)
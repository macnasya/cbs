import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { Container, Text, Button, Content } from 'native-base';
import UserHeader from './UserHeader'
import { logout } from '../../actions'

class UserDashboard extends React.Component {

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <UserHeader {...this.props} title="Dashboard"/>
          <Text>Welcome back,</Text>
          <Text>{this.props.user.profile && this.props.user.profile.displayName}</Text>
          <Button onPress={() => this.props.navigation.navigate('Logout')}><Text>Logout</Text></Button>
        </Content>
      </Container>
    );
  }

}

export default connect(({user}) => ({user}), {logout})(UserDashboard)
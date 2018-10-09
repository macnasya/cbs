import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { Container, Text, Button, Content } from 'native-base';
import OwnerHeader from './OwnerHeader'
import { logout } from '../../actions'
import CoursesList from './CourseList'

class OwnerDashboard extends React.Component {

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <OwnerHeader {...this.props} title="Dashboard"/>
          <Text>Welcome back,</Text>
          <Text>{this.props.user.profile && this.props.user.profile.displayName}</Text>
          <Button onPress={() => this.props.navigation.navigate('Logout')}><Text>Logout</Text></Button>
          <CoursesList />
        </Content>
      </Container>
    );
  }

}

export default connect(({user}) => ({user}), {logout})(OwnerDashboard)
import React from 'react'
import styles from '../styles'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Container, Text, Button, Content } from 'native-base';
import UserHeader from '../user//UserHeader'
import { logout } from '../../actions'

class Logout extends React.PureComponent {
  render () {
    return <Container style={styles.container}>
    <Content>
      <UserHeader {...this.props} title="Logout"/>
      <Text>Are you sure you want to sign out, {this.props.user.profile && this.props.user.profile.displayName}?</Text>
      <View style={{flexDirection: "row"}}>
        <Button warning onPress={() => this.props.logout()}><Text>Yes</Text></Button>
        <Button transparent={true} onPress={() => this.props.navigation.goBack()}>
          <Text>No, keep me signed in</Text>
        </Button>
      </View>
    </Content>
  </Container>
  }
}

export default connect(({user}) => ({user}), {logout})(Logout)
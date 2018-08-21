import React from 'react'
import styles from '../styles'
import { connect } from 'react-redux'
import { StatusBar } from 'react-native'
import { Container, Spinner } from 'native-base';
import { checkAuth } from '../../actions'

export class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    this._getAuthToken()
  }

  _getAuthToken = async () => {
    this.props.checkAuth()
  };

  componentDidUpdate () {
    if(!this.props.user.logginIn){
      this.props.navigation.navigate(this.props.user.loggedIn ? 'User' : 'Public')
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Spinner color="blue" />
        <StatusBar barStyle="default" />
      </Container>
    );
  }
}

export default connect(({ user }) => ({ user }), { checkAuth })(AuthLoadingScreen)
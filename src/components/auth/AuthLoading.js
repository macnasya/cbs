import React from 'react'
import styles from '../styles'
import { connect } from 'react-redux'
import { ActivityIndicator, StatusBar } from 'react-native'
import { Container } from 'native-base';
import { checkAuth } from '../../actions'

export class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._getAuthToken();
  }

  _getAuthToken = async () => {
    this.props.checkAuth()
  };

  componentWillUpdate () {
    this.props.navigation.navigate(this.props.user.loggedIn ? 'User' : 'Public')
  }

  render() {
    return (
      <Container style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </Container>
    );
  }
}

export default connect(({ user }) => ({ user }), { checkAuth })(AuthLoadingScreen)
import React from 'react';
import { connect } from 'react-redux'
import { Container, Text, Button, Content, Card, CardItem, Body } from 'native-base';
import { GoogleSigninButton } from 'react-native-google-signin';
import { View } from 'react-native';
import styles from '../styles'
import { loginGoogle, loginFB, logout } from '../../actions'
import AuthHeader from './AuthHeader'
class LoginScreen extends React.Component {
  constructor (params) {
    super(params)
    this.state = {
      error: null,
      errorMessage: ''
    }
  }

  render() {
    return <Container>
      <AuthHeader title="Login" {...this.props} />
      <Content>
      {this.state.error ?
        <Card transparent>
          <CardItem header>
            <Text style={styles.centered}>Login error</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{this.state.errorMessage || 'There was an error during login process'}</Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Body>
              <Button block onPress={() => this.setState({error: null, isSigninInProgress: false})}><Text>Try again</Text></Button>
            </Body>
          </CardItem>
        </Card>
      :
        <View>
          <GoogleSigninButton
            style={{ width: 48, height: 48 }}
            size={GoogleSigninButton.Size.Icon}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signInGoogle}
            disabled={this.state.isSigninInProgress} />
          <Button onPress={this._signInFB} disabled={this.state.isSigninInProgress}><Text>Login with Facebook</Text></Button>
        </View>
      }  
      </Content>
    </Container>
  }

  _signInFB = () => {
    this.setState({isSigninInProgress: true})
    this.props.loginFB(this._signInCallback)
  }

  _signInGoogle = () => {
    this.setState({isSigninInProgress: true})
    this.props.loginGoogle(this._signInCallback)
  }

  _signInCallback = (response) => {
    if(response && response.error) {
      return this.setState({ error: response.error,
      errorMessage: response.error.message })
    }
    if(response && !response.error){
      this.props.navigation.navigate('AuthLoading');
    } else {
      this.setState({isSigninInProgress: false})
    }
  }
}

export default connect(({loginError}) => ({loginError}), {loginGoogle, loginFB, logout})(LoginScreen)
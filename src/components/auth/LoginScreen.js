import React from 'react';
import { connect } from 'react-redux'
import { Container, Text, Button, Content, Card, CardItem, Body } from 'native-base';
import { GoogleSigninButton } from 'react-native-google-signin';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import styles from '../styles'
import { loginGoogle, loginFB, logout } from '../../actions'
import AuthHeader from './AuthHeader'
class LoginScreen extends React.Component {
  constructor (params) {
    super(params)
    this.state = {
      error: null
    }
  }

  // componentDidMount () {
  //   this._signInAsync()
  // }

  render() {
    return this.state.error ? <Container>
      <AuthHeader title="Login" {...this.props} />
      <Content>
        <Card transparent>
          <CardItem header>
            <Text style={styles.centered}>Login error</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>There was an error during login process</Text>
              <Button block onPress={this.setState({error: null})}><Text>Try again</Text></Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container> : <Container>
      <AuthHeader title="Login" {...this.props} />
      <Content>
        <GoogleSigninButton
          style={{ width: 48, height: 48 }}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signInGoogle}
          disabled={this.state.isSigninInProgress} />
        <Button onPress={this._signInFB}><Text>Login with Facebook</Text></Button>
      </Content>
    </Container>
  }

  _signInFB = () => {
    this.props.loginFB((response) => {
      if(response && response.error) {
        return
      }
      if (!response){
        this.setState({isSigninInProgress: false});
      } else {
        this.props.navigation.navigate('User');
      }
    })
  }

  _signInGoogle = () => {
    this.setState({isSigninInProgress: true})
    this.props.loginGoogle((response) => {
      this.setState({error: response.error_description})
      if(!response.error){
        this.props.navigation.navigate('User');
      }
    })
  }
}

export default connect(() => ({}), {loginGoogle, loginFB, logout})(LoginScreen)
import React from 'react';
import styles from '../styles'
import { connect } from 'react-redux'
import { login } from '../../actions'
import { Container, Text, Button, Content, Card, CardItem, Body } from 'native-base';
import AuthHeader from './AuthHeader'
class LoginScreen extends React.Component {
  constructor (params) {
    super(params)
    this.state = {
      error: null
    }
  }

  componentDidMount () {
    this._signInAsync()
  }

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
              <Button block onPress={this._signInAsync}><Text>Try again</Text></Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container> : null
  }

  _signInAsync = () => {
    this.props.login((response) => {
      this.setState({error: response.error_description})
      if(!response.error){
        this.props.navigation.navigate('User');
      }
    })
  };
}

export default connect(() => ({}), {login})(LoginScreen)
import React from 'react'
import { Header, Body, Title, Button, Left, Icon } from 'native-base';
import { NavigationActions } from 'react-navigation'

export default class AuthHeader extends React.Component {
  render() {
    return (<Header>
      <Left>
        <Button transparent onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
          <Icon name='arrow-back' />
        </Button>
      </Left>
      <Body>
        <Title>{this.props.title}</Title>
      </Body>
    </Header>)
  }
}
import React from 'react'
import { Header, Body, Title, Button, Left, Icon } from 'native-base';

export default class PublicHeader extends React.Component {
  render() {
    return (<Header>
      <Left>
        <Button transparent
          onPress={() => this.props.navigation.openDrawer()}>
          <Icon name='menu' />
        </Button>
      </Left>
      <Body>
        <Title>{this.props.title}</Title>
      </Body>
    </Header>)
  }
}
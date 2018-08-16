import React from 'react';
import styles from '../styles'
import { Container, Text } from 'native-base';
import PublicHeader from './PublicHeader'

export default class AboutScreen extends React.Component {
  static navigationOptions = {
    title: 'About',
  }
  
  render() {
    return (
      <Container style={styles.container}>
        <PublicHeader {...this.props} title="Welcome" />
        <Text>About</Text>
      </Container>
    );
  }
}

import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../actions'

class Logout extends React.PureComponent {
  componentDidMount () {
    this.props.logout(() => this.props.navigation.navigate('AuthLoading'))
  }
  render () {
    return null
  }
}

export default connect(() => ({}), {logout})(Logout)
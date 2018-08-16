import { actionTypes } from '../actions'

const defaultState = {
  loggedIn: false
}

export const user = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH: return {
      loggedIn: true,
      userToken: action.userToken
    }
    case actionTypes.LOGOUT: return {
      loggedIn: false
    }
    default: return state;
  }
}
import { actionTypes } from '../actions'

const defaultState = {
  loggedIn: false,
  logginIn: false
}

export const user = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH: return {
      loggedIn: action.token ? true : false,
      logginIn: false,
      token: action.token,
      profile: action.profile
    }
    case actionTypes.LOGGININ: return {...state,
      loggedIn: false,
      logginIn: true,
      token: null,
      profile: {}
    }
    case actionTypes.LOGOUT: return {
      loggedIn: false,
      logginIn: false,
      token: null,
      profile: {}
    }
    default: return state;
  }
}
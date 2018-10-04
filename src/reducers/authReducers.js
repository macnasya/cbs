import { actionTypes } from '../actions'

const defaultState = {
  loggedIn: false,
  logginIn: false
}

export const user = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_PROFILE: return {
      loggedIn: !!action.profile,
      logginIn: false,
      profile: action.profile
    }
    case actionTypes.LOGGININ: return {...state,
      loggedIn: false,
      logginIn: true,
      profile: null
    }
    case actionTypes.LOGOUT: return {
      loggedIn: false,
      logginIn: false,
      profile: null
    }
    default: return state;
  }
}
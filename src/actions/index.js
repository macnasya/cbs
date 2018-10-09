import { 
  checkAuth,
  logout,
  loginGoogle,
  loginFB
} from './authActions'

const  actionTypes = {
  SET_PROFILE: 'SET_PROFILE',
  LOGOUT: 'LOGOUT',
  LOGGININ: 'LOGGININ'
}

export {
  actionTypes,

  checkAuth,
  logout,
  loginGoogle,
  loginFB
}
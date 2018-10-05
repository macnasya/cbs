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

const API_URL = 'http://localhost:3456'

export {
  actionTypes,
  API_URL,

  checkAuth,
  logout,
  loginGoogle,
  loginFB
}
import { 
  checkAuth,
  logout
} from './authActions'

const  actionTypes = {
  SET_AUTH: 'SET_AUTH',
  LOGOUT: 'LOGOUT'
}

export {
  actionTypes,

  checkAuth,
  logout,
}
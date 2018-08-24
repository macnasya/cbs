import { AsyncStorage, Platform } from 'react-native'
import { actionTypes, API_URL } from './index'
import Auth0 from 'react-native-auth0';
const auth0Config = { domain: 'cbs.auth0.com', clientId: 'cTeCslmL_jnmf6JBM7_vmXQ5eKGlMBhe' }
const auth0 = new Auth0(auth0Config);
import axios from 'axios';

export function setUserProfile (data) {
  return {...data,
    type: actionTypes.SET_PROFILE
  }
}

export function setLogout () {
  return {
    type: actionTypes.LOGOUT
  }
}

export function setLogingIn () {
  return {
    type: actionTypes.LOGGININ
  }
}

export const checkAuth = () => async (dispatch) => {
  const userToken = await AsyncStorage.getItem('userToken');
  dispatch(userToken ? loadUserProfile(JSON.parse(userToken)) : logout())
  dispatch(setLogingIn())
}

export const logout = (callback = () => {}) => (dispatch) => {
  if (Platform.OS === 'android') {
    AsyncStorage.removeItem('userToken');
    dispatch(setLogout())
    callback()
  } else {
    auth0.webAuth
      .clearSession({})
      .then(async success => {
        await AsyncStorage.removeItem('userToken');
        dispatch(setLogout())
        callback()
      })
      .catch(error => console.log(error));
  }
}

export const login = (callback) => (dispatch) => {
  const authOptions = {
    scope: 'openid profile email read:profile write:profile', 
    audience: `${API_URL}`
  }
  auth0
    .webAuth
    .authorize(authOptions)
    .then(credentials => {
      console.log(credentials)
      AsyncStorage.setItem('userToken', JSON.stringify({accessToken: credentials.accessToken, scope: credentials.scope}));
      dispatch(loadUserProfile(credentials, callback))
    })
    .catch(error => callback(error));
}

export const loadUserProfile = (credentials, callback = () => {}) => (dispatch) => {
  const headers = { 'Authorization': `Bearer ${credentials.accessToken}`}
  axios.get(`${API_URL}/api/user/profile`, { headers })
    .then(response => {
      dispatch(setUserProfile({profile: response.data, token: credentials.accessToken, scope: credentials.scope.split(' ')}))
      callback(response.data)
    })
    .catch(error => console.log(error));

};
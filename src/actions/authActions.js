import { AsyncStorage } from 'react-native'
import { actionTypes } from './index'
import Auth0 from 'react-native-auth0';
const auth0Config = { domain: 'cbs.auth0.com', clientId: 'cTeCslmL_jnmf6JBM7_vmXQ5eKGlMBhe' }
const auth0 = new Auth0(auth0Config);
import axios from 'axios';

export function setAuth (data) {
  return {
    type: actionTypes.SET_AUTH,
    token: data.token,
    profile: data.profile
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
  dispatch(setLogingIn())
  const userToken = await AsyncStorage.getItem('userToken');
  dispatch(userToken ? loadUserProfile(userToken) : logout())
}

export const setUserData = (data) => async (dispatch) => {
  await AsyncStorage.setItem('userToken', data.token);
  dispatch(setAuth(data))
}

export const logout = (callback = () => {}) => async (dispatch) => {
  await AsyncStorage.removeItem('userToken');
  dispatch(setLogout())
  callback()
}

export const login = (callback) => async (dispatch) => {
  auth0
    .webAuth
    .authorize({scope: 'openid profile email', audience: `https://${auth0Config.domain}/userinfo`})
    .then(credentials => {
      dispatch(loadUserProfile(credentials.accessToken, callback))
    })
    .catch(error => callback(error));
}

export const loadUserProfile = (accessToken, callback = () => {}) => async (dispatch) => {
  let response = await axios.get(`https://${auth0Config.domain}/userinfo?access_token=${accessToken}`, {
    params: {
      _: (new Date).getTime()
    }
  });
  dispatch(setUserData({profile: response.data, token: accessToken}))
  callback(response.data)
};
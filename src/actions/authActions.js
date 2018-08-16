import { AsyncStorage } from 'react-native'
import { actionTypes } from './index'
import axios from 'axios';

export function setAuth (userToken) {
  return {
    type: actionTypes.SET_AUTH,
    userToken
  }
}

export function setLogout () {
  return {
    type: actionTypes.LOGOUT
  }
}

export const checkAuth = () => async (dispatch) => {
  const userToken = await AsyncStorage.getItem('userToken');
  dispatch(setAuth(userToken))
}

export const logout = (callback) => async (dispatch) => {
  await AsyncStorage.removeItem('userToken');
  dispatch(setLogout())
  callback()
}
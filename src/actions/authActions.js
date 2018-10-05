import firebase from 'react-native-firebase';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { AsyncStorage, Platform } from 'react-native'
import { actionTypes, API_URL } from './index'
GoogleSignin.configure();

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
  dispatch(setLogingIn())
  firebase.auth().onAuthStateChanged((user) => {
    dispatch(setUserProfile({profile: user}))
  });
  const isSignedIn = await GoogleSignin.isSignedIn();
  if( isSignedIn ){
    try {
      const userInfo = await GoogleSignin.signInSilently();
      const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
        // Login with the credential
      firebase.auth().signInWithCredential(credential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // logout()
      } else {
        // some other error
      }
    }
  }
}

export const logout = (callback = () => {}) => async (dispatch) => {
  try {
    // await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    firebase.auth().signOut().then(function() {
      dispatch(setLogout())
      callback()
    }).catch(function(error) {
      console.error(error);
    });
  } catch (error) {
    console.error(error);
  }
}

export const login = (callback) => async (dispatch) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
      // Login with the credential
    firebase.auth().signInWithCredential(credential).then(response => callback(response));
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
    callback({ error })
  }
}

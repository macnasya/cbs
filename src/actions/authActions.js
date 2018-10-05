import firebase from 'react-native-firebase';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
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
}

export const logout = (callback = () => {}) => (dispatch) => {
  firebase.auth().signOut().then(async function() {
    dispatch(setLogout())
    setTimeout(callback, 10)
    if(await GoogleSignin.isSignedIn()){
      await GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
    }
  }).catch(function(error) {
    console.log(error);
  });
}

export const loginGoogle = (callback) => async (dispatch) => {
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

export const loginFB = (callback) => (dispatch) => {
  LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
      if (result.isCancelled) {
        return Promise.reject(new Error('The user cancelled the request'));
      } else {
        return AccessToken.getCurrentAccessToken()
      }
    })
    .then(data => {
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      // Login with the credential
      return firebase.auth().signInWithCredential(credential);
    })
    .then(response => callback(response))
    .catch(error => callback({error}));
}

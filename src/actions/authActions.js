import firebase from 'react-native-firebase';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { AsyncStorage, Platform } from 'react-native'
import { actionTypes } from './index'
import { navigate } from '../navigation/NavigationService'
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

export const checkAuth = () => (dispatch) => {
  dispatch(setLogingIn())
  firebase.auth().onAuthStateChanged((user) => {
    updateRole(user, 
      (profile) => {
        dispatch(setUserProfile({profile}))
      }
    )
  });
}

export const logout = (callback = () => {}) => (dispatch) => {
  firebase.auth().signOut().then(async function() {
    dispatch(setLogout())
    LoginManager.logOut()
    setTimeout(callback, 10)
    if(await GoogleSignin.isSignedIn()){
      await GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
    }
  }).catch(function(error) {
    console.log(error);
  });
}

const updateRole = (user, callback) => {
  if(!firebase.auth().currentUser)
    return callback(user)
  const users = firebase.firestore().collection('users')
  users.where("uid", "==", firebase.auth().currentUser.uid)
    .get()
    .then((querySnapshot) => {
      let profile = {...user}
      if(querySnapshot.empty){
        users.add({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        })
      } else {
        profile = {...profile, ...querySnapshot.docs[0].data()}
      }
      callback(profile)
    })
}

export const loginGoogle = (callback) => async (dispatch) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken);
      // Login with the credential
    firebase.auth().signInWithCredential(credential)
      .then(response => callback(response));
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      error.message = 'User cancelled the request'
    } else if (error.code === statusCodes.IN_PROGRESS) {
      error.message = 'Operation is in progress'
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      error.message = 'Play services not available or outdated'
    } else {
      error.message = 'Sign in request has been cancelled or unknown error'
    }
    callback({ error })
  }
}

export const loginFB = (callback) => async (dispatch) => {
  try {
    const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    if (result.isCancelled) {
      throw new Error('User cancelled the request')
    } else {
      const data = await AccessToken.getCurrentAccessToken()
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      firebase.auth().signInWithCredential(credential)
        .then(response => callback(response))
        .catch(error => callback({ error }));
    }
  } catch (error) {
    callback({ error })
  }
}

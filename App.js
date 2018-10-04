import React from 'react';
import allReducers from './src/reducers/index.js';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import firebase from 'react-native-firebase';
import NavigationRoot from './src/navigation';
import NavigationService from './src/navigation/NavigationService';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

const store = createStore(allReducers, applyMiddleware(thunk));

firebase.auth().onAuthStateChanged((user) => {
  if(!user) {
    NavigationService.navigate('AuthLoading');
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationRoot ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }} />
      </Provider>
    );
  }
}
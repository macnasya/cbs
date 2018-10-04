import React from 'react'
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation'
import HomeScreen from '../components/public/HomeScreen'
import AboutScreen from '../components/public/AboutScreen'
import UserDashboard from '../components/user/UserDashboard'
import SideBar from '../components/common/SideBar'
import { AuthLoadingScreen, LoginScreen, Logout } from '../components/auth'

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen
  },
  {
    initialRouteName: 'Login',
    headerMode: "none",
  })
const PublicDrawer = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Login: {
      screen: AuthStack
    },
    About: {
      screen: AboutScreen
    },
  },
  {
    initialRouteName: "Home",
    contentComponent: props => <SideBar {...props} />
  }
)
const UserStack = createDrawerNavigator(
  {
    Dashboard: {
      screen: UserDashboard
    },
    Logout: {
      screen: Logout
    }
  },
  {
    initialRouteName: 'Dashboard',
    contentComponent: props => <SideBar {...props} />
  }
)
  
export default navigationRoot = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Public: PublicDrawer,
    User: UserStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

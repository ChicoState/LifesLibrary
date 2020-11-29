import * as React from "react";
import { Button, View, Text, StyleSheet, Modal, TextInput, useEffect, useContext } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as firebase from 'firebase';
import firebaseConfig from './components/Firebase';
// Pages
import Load from "./pages/Load";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Scanner from './components/scanner';
import Library from './components/library';

//import firebase from "./components/Firebase";
firebase.auth().onAuthStateChanged(user => {
  if (user != null) {
    console.log('We are authenticated now!');
  }

  // Do other things
});

const MainNavigator = createMaterialTopTabNavigator();
const AuthNavigator = createStackNavigator();


const AuthContainer = () => (
  <AuthNavigator.Navigator>
    <AuthNavigator.Screen mame = 'LoadScreen' component = {Load}/>
  </AuthNavigator.Navigator>
  );

const MainContainer = () => (
  <MainNavigator.Navigator style={styles.navbar} initialRouteName="Library" tabBarPosition='bottom' tabBarOptions={{indicatorStyle: styles.indicator, style: styles.navbar, activeTintColor: 'white', showIcon: true, showLabel: false,}}>
    
    <MainNavigator.Screen name="Library" component={Library} options={{
    tabBarLabel: 'Library',
    tabBarIcon: ({ color }) => (
    <MaterialCommunityIcons name="book" color={color} size={20} />
    ),
    }}/>
    <MainNavigator.Screen name="Scanner" component={Scanner} options={{
    tabBarLabel: 'Scanner',
    tabBarIcon: ({ color }) => (
    <MaterialCommunityIcons name="camera" color={color} size={20} />
    ),
    }}/>
  </MainNavigator.Navigator>
  );


export default function App()  {
  return (
    <NavigationContainer>
      <MainContainer/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#060606FF',
  },
  indicator: {
    backgroundColor: 'red',
    height: 5,
  },
})
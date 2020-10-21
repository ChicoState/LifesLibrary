import React from "react";
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Pages

import Load from "./pages/Load";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

// Firebase Code
// import * as firebase from 'firebase';
import firebase from "./components/Firebase";
// Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(fireconfig);
// }
// firebase.analytics();

const Stack = createStackNavigator();

function App() {
  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Load">
        <Stack.Screen name="Load" component={Load} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} options={{ title: "Home", headerShown: false, }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

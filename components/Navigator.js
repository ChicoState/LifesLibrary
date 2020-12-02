import React from "react";
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Scanner from './components/scanner';
import Library from './components/library';

const Tab = createMaterialTopTabNavigator();

function App() {
    return (
        <NavigationContainer>
          <Tab.Navigator style={styles.navbar} initialRouteName="Library" tabBarPosition='bottom' tabBarOptions={{indicatorStyle: styles.indicator, style: styles.navbar, activeTintColor: 'white', showIcon: true, showLabel: false,}}>
          {/*  <Tab.Screen name="Load" component={Load} />
            <Tab.Screen name="SignUp" component={SignUp} />
            <Tab.Screen name="Login" component={Login} /> */}
            <Tab.Screen name="Library" component={Library} options={{
              tabBarLabel: 'Library',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="book" color={color} size={20} />
              ),
            }}/>
            <Tab.Screen name="Scanner" component={Scanner} options={{
              tabBarLabel: 'Scanner',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="camera" color={color} size={20} />
              ),
            }}/>
          </Tab.Navigator>
        </NavigationContainer>
    );
  }

  export default App;

  const styles = StyleSheet.create({
    navbar: {
      backgroundColor: '#060606FF',
    },
    indicator: {
      backgroundColor: 'red',
      height: 5,
    },
  })

import * as React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from
  '@react-navigation/material-top-tabs';
import {MaterialCommunityIcons} from '@expo/vector-icons';

// Pages
import Scanner from './components/scanner';
import Map from './components/map';
import Library from './components/library';

const MainNavigator = createMaterialTopTabNavigator();

const MainContainer = () => (
  <MainNavigator.Navigator style={styles.navbar} initialRouteName="Library"
    tabBarPosition='bottom' tabBarOptions={{indicatorStyle: styles.indicator,
      style: styles.navbar,
      activeTintColor: 'white',
      showIcon: true, showLabel: false}}>

    <MainNavigator.Screen name="Map" component={Map} options={{
      tabBarLabel: 'Map',
      // eslint-disable-next-line react/display-name, react/prop-types
      tabBarIcon: ({color}) => (
        <MaterialCommunityIcons name="map" color={color} size={20} />
      ),
    }}/>
    <MainNavigator.Screen name="Library" component={Library} options={{
      tabBarLabel: 'Library',
      // eslint-disable-next-line react/display-name, react/prop-types
      tabBarIcon: ({color}) => (
        <MaterialCommunityIcons name="book" color={color} size={20} />
      ),
    }}/>
    <MainNavigator.Screen name="Scanner" component={Scanner} options={{
      tabBarLabel: 'Scanner',
      // eslint-disable-next-line react/display-name, react/prop-types
      tabBarIcon: ({color}) => (
        <MaterialCommunityIcons name="camera" color={color} size={20} />
      ),
    }}/>
  </MainNavigator.Navigator>
);

/**
* Exports class
*/
export default class App extends React.Component {
  /** Renders components for top level of the app
  * @return {HTML} html for Dom to process
  */
  render() {
    return (
      <NavigationContainer>
        <MainContainer/>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#060606FF',
  },
  indicator: {
    backgroundColor: 'red',
    height: 5,
  },
});

import React, { useState, useEffect } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation';
import { BarCodeScanner } from 'expo-barcode-scanner';

function DetailsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
  
  function LibraryScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Library screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }
  
  function ScanScreen({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
  
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
  
        {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
    );
  }
  
  const LibraryStack = createStackNavigator();
  
  function LibraryStackScreen() {
    return (
      <LibraryStack.Navigator>
        <LibraryStack.Screen name="Library" component={LibraryScreen} />
        <LibraryStack.Screen name="Details" component={DetailsScreen} />
      </LibraryStack.Navigator>
    );
  }
  
  const ScanStack = createStackNavigator();
  
  function ScanStackScreen() {
    return (
      <ScanStack.Navigator>
        <ScanStack.Screen name="Scan" component={ScanScreen} />
        <ScanStack.Screen name="Details" component={DetailsScreen} />
      </ScanStack.Navigator>
    );
  }
  
  const Tab = createBottomTabNavigator();
  
  export default function App() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Library" component={LibraryStackScreen} />
          <Tab.Screen name="Scan" component={ScanStackScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
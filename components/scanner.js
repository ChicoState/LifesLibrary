import React, { useState, useEffect, Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { app } from 'firebase';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.hasPermission = null;
    this.setHasPermission = null;
    this.scanned = null;
    this.setScanned = null;
    this.handleBarCodeScanned = null;
    this.hasPermission = null;
    this.data = null;
  }

 App(){
  [this.hasPermission, this.setHasPermission] = useState(null);
  [this.scanned, this.setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  this.handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    this.data = data;
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (this.hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (this.hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
}
  render() {
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={this.scanned ? undefined : this.handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}/>
      {this.scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#000",
      marginVertical: 0,
    }
  });

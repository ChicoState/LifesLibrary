import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


export default function App() {
  
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
  }
  return (
    
    <View style={styles.container}>
      <Text style={{fontSize: 50, padding: 20, borderWidth: 2, borderColor: "#fff"}}>Life's Library</Text>
      <StatusBar style="auto" />
      
      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={{ backgroundColor: '#888' }}>
        <Text style={{ fontSize: 20, color: '#111' }}>Upload or Scan</Text>
      </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
});

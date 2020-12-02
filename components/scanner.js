import React, {useState} from 'react';
import { Button, View, Text, StyleSheet, Modal, TextInput, useEffect, useContext, ActivityIndicator, TouchableHighlight } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Google from 'expo-google-app-auth';
import { fetchUpdateAsync } from 'expo-updates';
import Add from "./bookCommit"
var modaldata = "0";
var bookdata = new XMLHttpRequest();



export default class ScannerScreen extends React.Component{

  constructor(props) {
    super(props);
    this.getBook = this.getBook.bind(this);
  }

  // Component State
  state = {
    hasCameraPermission: null, // if app has permissions to acess camera
    isScanned: false, // scanned
    show: false,
    bookInfo: [],
    ISBN: ""
  }
  async componentDidMount() {
    // ask for camera permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    console.log(status);
    this.setState({ hasCameraPermission: status === "granted" ? true : false });
  }

  handleBarCodeScanned = ({ data }) => {
    var isbn = data;
    this.setState({ scanned: true });
    this.getBook(isbn, this.alertInfo);
  };

  getBook(isbn, callback) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(isbn)}`)
        .then(response => response.json())
        .then(responseJson => {
            this.setState({ bookInfo: responseJson.items[0].volumeInfo.title, ISBN: isbn});
            callback();
        })
    .catch(error => {
      console.error(error);
    });
  }
  addBook(){
    Add.insert(this.state.isbn);
    this.hideModal();
  }

  alertInfo = () => { //Event happens after book information is returned by getBook
    this.showModal();
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
    this.setState({ scanned: false });
  };

  render(){
    const { hasCameraPermission, isScanned } = this.state;
    if(hasCameraPermission === null){
      console.log("Requesting permission");
      return (
        <ActivityIndicator />
      );
    }

    if(hasCameraPermission === false){
      return (
        <View style = {styles.container}>
         <Text>Camera Permission Required</Text>
        </View>
      );
    }

    return (
    <View style = {styles.container}>
      <Modal visible={this.state.show} handleClose={this.hideModal}>
        <View style = {styles.container}>
          <Text>Scanned: {this.state.bookInfo}</Text>
          <Button title="Add Book to Library" onPress={() => {this.addBook();}}/>
          <Button title="Close" onPress={() => {this.hideModal();}}/>
        </View>
      </Modal>
      <BarCodeScanner
        onBarCodeScanned = { isScanned ? undefined : this.handleBarCodeScanned }
        style = {StyleSheet.absoluteFill}
        />
    </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginVertical: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

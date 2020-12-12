import React from 'react';
import { Button, View, Text, StyleSheet, Modal, ActivityIndicator, Animated, AsyncStorage  } from 'react-native';
import { Slider } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScannerScreen extends React.Component{

  constructor(props) {
    super(props);
    this.getBook = this.getBook.bind(this);
    this.state= {
      library: [],
      book: {
        isbn: "isbn",
        author: "author",
        title: "title",
        description: "description",
        coverArt: "http://covers.openlibrary.org/b/isbn/",
      },
      hasCameraPermission: null, // if app has permissions to acess camera
      isScanned: false, // scanned
      show: false,
      bookInfo: 'title',
      };
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
          this.setState({ book: {
            isbn: isbn,
            author: responseJson.items[0].volumeInfo.authors,
            title: responseJson.items[0].volumeInfo.title,
            description: responseJson.items[0].volumeInfo.description,
            coverArt: responseJson.items[0].volumeInfo.imageLinks.thumbnail}});
          callback();
      })
    .catch(error => {
      console.error(error);
    });
  }

  async addtolibrary(){
    await this.load();
    var joined = this.state.library.concat(this.state.book);
    console.log(this.state.book)
    this.setState({ library: joined });
    this.save();
  }

  save = async() => {
    try {
      await AsyncStorage.setItem("library", JSON.stringify(this.state.library));
    }
    catch (err) {
      alert(err);
    }
  }

  load = async () => {
    try {
      let library = await AsyncStorage.getItem("library");
      if (library !== null) {
        var joined = [].concat(JSON.parse(library));
        this.setState({ library: joined })
      }
    }
    catch (err) {
      alert(err);
    }
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
        <Text style={styles.itemTitle}>{this.state.book.title + "\n"}</Text>
        <Text style={styles.itemAuthor}>{this.state.book.author + "\n"}</Text>
        <Text style={styles.itemText}>{"\t" + this.state.book.description + "\n\n" + "ISBN: " + this.state.book.isbn}</Text>
          <View style={{flexDirection: "row"}}>
            <Button title="Close" onPress={() => {this.hideModal();}}/>
            <Button title="Add To Library" onPress={() => {this.addtolibrary()}}/>
          </View>

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
  itemText: {
      textAlign: "left"
  },
  itemTitle: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center"
  },
  itemAuthor: {
      fontSize: 15,
      fontWeight: "bold",
      textAlign: "center"
    },
    appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

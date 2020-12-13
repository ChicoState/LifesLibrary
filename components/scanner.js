import React from 'react';
import {Button, View, Text, StyleSheet, Modal, ActivityIndicator, AsyncStorage}
  from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

const fetch = require('node-fetch');

/**
* Exports class
*/
export default class ScannerScreen extends React.Component {
  /**
  * Constructor for Scanner
  * @param {obj} props metadata front react native
  */
  constructor(props) {
    super(props);
    getBook = this.getBook.bind(this);
    // eslint-disable-next-line no-invalid-this
    this.state = {
      library: [],
      book: {
        isbn: 'isbn',
        author: 'author',
        title: 'title',
        description: 'description',
        coverArt: 'http://covers.openlibrary.org/b/isbn/',
      },
      hasCameraPermission: null, // if app has permissions to access camera
      isScanned: false, // scanned
      show: false,
      bookInfo: 'title',
    };
  }
  /**
  * Chcecks if component mounted to the DOM
  */
  async componentDidMount() {
    // ask for camera permission
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted' ? true : false});
  }

  handleBarCodeScanned = ({data}) => {
    const isbn = data;
    // eslint-disable-next-line no-invalid-this
    this.setState({scanned: true});
    // eslint-disable-next-line no-invalid-this
    this.getBook(isbn);
  };
  /**
  * Gets data about a book from google books API
  * @param {string} isbn The isbn from the scanner for the book just scanned
  * @param {function} callback the function to be called after data is found
  */
  getBook(isbn) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(isbn)}`)
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({book: {
            isbn: isbn,
            author: responseJson.items[0].volumeInfo.authors,
            title: responseJson.items[0].volumeInfo.title,
            description: responseJson.items[0].volumeInfo.description,
            coverArt: responseJson.items[0].volumeInfo.imageLinks.thumbnail}});
          this.alertInfo();
        })
        .catch((error) => {
          console.error(error);
        });
  }
  /**
  * Adds book scanned to library if desired
  */
  async addtolibrary() {
    await this.load();
    if (typeof this.state.library.find(
        ({isbn}) => isbn === this.state.book.isbn ) === 'undefined') {
      const joined = this.state.library.concat(this.state.book);
      this.setState({library: joined});
    }
    // eslint-disable-next-line no-invalid-this
    this.save();
    // eslint-disable-next-line no-invalid-this
    this.hideModal();
  }

  save = async () => {
    try {
      // eslint-disable-next-line no-invalid-this
      await AsyncStorage.setItem('library', JSON.stringify(this.state.library));
    } catch (err) {
      alert(err);
    }
  }

  load = async () => {
    try {
      const library = await AsyncStorage.getItem('library');
      if (library !== null) {
        const joined = [].concat(JSON.parse(library));
        // eslint-disable-next-line no-invalid-this
        this.setState({library: joined});
      }
    } catch (err) {
      alert(err);
    }
  }
  // Event happens after book information is returned by getBook
  alertInfo = () => {
    // eslint-disable-next-line no-invalid-this
    this.showModal();
  }

  showModal = () => {
    // eslint-disable-next-line no-invalid-this
    this.setState({show: true});
  };

  hideModal = () => {
    // eslint-disable-next-line no-invalid-this
    this.setState({show: false});
    // eslint-disable-next-line no-invalid-this
    this.setState({scanned: false});
  };
  /**
  * @return {HTML} returns HTML to be mounted on DOM
  */
  render() {
    const {hasCameraPermission, isScanned} = this.state;
    if (hasCameraPermission === null) {
      return (
        <ActivityIndicator />
      );
    }

    if (hasCameraPermission === false) {
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
            <Text style={styles.itemTitle}>
              {this.state.book.title + '\n'}
            </Text>
            <Text style={styles.itemAuthor}>
              {this.state.book.author + '\n'}
            </Text>
            <Text style={styles.itemText}>
              {'\t' + this.state.book.description + '\n\n' + 'ISBN: ' +
              this.state.book.isbn}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Button title='Close' onPress={() => {
                this.hideModal();
              }}/>
              <Button title='Add To Library' onPress={() => {
                this.addtolibrary();
              }}/>
            </View>

          </View>
        </Modal>
        <BarCodeScanner
          onBarCodeScanned =
            { isScanned ? undefined : this.handleBarCodeScanned }
          style = {StyleSheet.absoluteFill}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    textAlign: 'left',
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemAuthor: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

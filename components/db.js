import React from 'react';
import {StyleSheet, Text, View, FlatList, Dimensions, Button, TouchableOpacity,
  Modal, ImageBackground, SafeAreaView, TextInput, AsyncStorage}
  from 'react-native';

/**
  * Number of columns in library gallary view
  */
const numColumns = 3;

/**
* Exports class
* @param {string} isbn of a book
* @param {string} author of a book
* @param {string} title of a book
* @param {string} description of a book
* @param {string} coverArt URL to book cover art
* @param {obj} props metadata front react native
*/
export default class Lib extends React.Component {
  /**
  * constructor for searching and displaying books
  * @param {obj} props metadata front react native
  */
  constructor(props) {
    super(props);
    this.state= {library: [], modalVisible: false, searching: false, search: [],
      book: {
        isbn: 'isbn',
        author: 'author',
        title: 'title',
        description: 'description',
        coverArt: '',
      },
    };
  };

  /**
  * Checks if components mounted to the DOM
  */
  componentDidMount() {
    this.load();
  }

  /**
  * Checks if components mounted to the DOM
  * @param {dict} book  dict of a book info similar to the constructor
  */
  inspectBook(book) {
    this.setState({book: book});
    this.setState({modalVisible: true});
    console.log(book);
  }

  /**
  * Filters results based on book title
  * @param {string} input A search string to check against titles
  */
  searchLibrary(input) {
    const library = this.state.library;
    const regex = new RegExp(input, 'i');
    const results = [];
    if (input) {
      this.setState({searching: true});
      console.log(library);
      library.forEach((book) => {
        if (book.title.match(regex)) {
          results.push(book);
        };
      });
    } else {
      this.setState({searching: false});
    }
    this.setState({search: results});
  }

  clearlibrary = async () => {
    // eslint-disable-next-line no-invalid-this
    this.setState({library: []});
    try {
      await AsyncStorage.setItem('library', JSON.stringify([]));
    } catch (err) {
      alert(err);
    }
  }

  /**
  * Adds 3 books to the database to testing and showcase purposes
  */
  async sample() {
    await this.entry('0439023521', 'Suzanne Collins', 'The Hunger Games', 'In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and one girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV. Sixteen-year-old Katniss Everdeen, who lives alone with her mother and younger sister, regards it as a death sentence when she is forced to represent her district in the Games. But Katniss has been close to dead before - and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weigh survival against humanity and life against love.', 'http://covers.openlibrary.org/b/isbn/0439023521-M.jpg');
    await this.entry('0765376679', 'Brandon Sanderson', 'The Way of Kings: Book One of the Stormlight Archive', 'Description', 'http://covers.openlibrary.org/b/isbn/0765376679-M.jpg');
    await this.entry('038552885X', 'Stephen King', 'The Stand', 'Description  ', 'http://covers.openlibrary.org/b/isbn/038552885X-M.jpg');
  }

  entry = async (isbn, author, title, description, coverArt) => {
    // eslint-disable-next-line no-invalid-this
    await this.setState({book: {
      isbn: isbn,
      author: author,
      title: title,
      description: description,
      coverArt: coverArt,
    },
    });
    // eslint-disable-next-line no-invalid-this
    const joined = this.state.library.concat(this.state.book);
    // eslint-disable-next-line no-invalid-this
    this.setState({library: joined});
    // eslint-disable-next-line no-invalid-this
    this.save();
  }

  save = async () => {
    // eslint-disable-next-line no-invalid-this
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
        // eslint-disable-next-line no-invalid-this
        this.setState({library: JSON.parse(library)});
      }
    } catch (err) {
      alert(err);
    }
  }
  /**
  * @return {HTML} sends component HTML to DOM
  */
  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Button title="close" onPress={
              ()=> this.setState({modalVisible: false})} />
            <View style={styles.view}>
              <Text style={styles.itemTitle}>
                {this.state.book.title + '\n'}
              </Text>
              <Text style={styles.itemAuthor}>
                {this.state.book.author + '\n'}
              </Text>
              <Text style={styles.itemText}>
                {'\t' + this.state.book.description + '\n\n' +
                'ISBN: ' + this.state.book.isbn}
              </Text>
            </View>
          </View>
        </Modal>

        <TextInput
          style={styles.textInput}
          onSubmitEditing={(event)=> this.searchLibrary(event.nativeEvent.text)}
        />

        {!this.state.searching ?
          <FlatList
            style={styles.container}
            numColumns='3'
            data={this.state.library}
            keyExtractor={( item ) => item.isbn}
            renderItem = {( {item} ) => (
              <TouchableOpacity
                style={styles.item}
                onPress={()=>this.inspectBook(item)}>
                <ImageBackground
                  source={{uri: item.coverArt}} style={styles.item}>
                </ImageBackground>
              </TouchableOpacity>
            )}/> :
          <View style ={{flex: 1}}>

            <FlatList
              style={styles.container}
              numColumns='3'
              data={this.state.search}
              keyExtractor={( item ) => item.isbn}
              renderItem = {( {item} ) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={()=>this.inspectBook(item)}>
                  <ImageBackground
                    source={{uri: item.coverArt}} style={styles.item}>
                  </ImageBackground>
                </TouchableOpacity>
              )}/>
            <Text>Searching</Text>
          </View>
        }

        <View style={{flexDirection: 'row'}}>
          <Button onPress={() => this.clearlibrary()} title="clear"/>
          <Button onPress={() => this.sample()} title="sample"/>
          <Button onPress={() => this.componentDidMount()} title="refresh"/>
        </View>

      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
  },
  view: {
    height: '50%',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
  },
  item: {
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
    margin: 1.5,
    width: Dimensions.get('window').width / numColumns - (3),
    height: Dimensions.get('window').width / numColumns * 1.5,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
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
  inspect: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: (Dimensions.get('window').width / numColumns - (3)) - 3,
    height: (Dimensions.get('window').width / numColumns * 1.5) - 3,
    margin: 1.5,
  },
  safeAreaView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

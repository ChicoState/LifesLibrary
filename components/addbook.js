import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Button, TouchableOpacity, Modal, Image, ImageBackground, SafeAreaView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


const numColumns = 3;

export default class AddBook extends React.Component{
  constructor(props) {
    super(props);
    this.state= { library: [], modalVisible: false, searching: false, search: [],
      book: {
        isbn: "isbn",
        author: "author",
        title: "title",
        description: "description",
        coverArt: ""
      }
  };
  };



  componentDidMount(){
    this.load();
  }

  inspectBook(book){
    this.setState({book: book});
    this.setState({modalVisible: true});
    console.log(book);
  }

  searchLibrary(input){
    var results = [];
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(input)}`)
      .then(response => response.json())
      .then(responseJson => {
        var i;
          for (i = 0; i < 9; i++)
          { results.push({
            isbn: responseJson.items[i].volumeInfo.industryIdentifiers[0].identifier,
            author: responseJson.items[i].volumeInfo.authors,
            title: responseJson.items[i].volumeInfo.title,
            description: responseJson.items[i].volumeInfo.description,
            coverArt: responseJson.items[i].volumeInfo.imageLinks.thumbnail})
          }
          this.setState();
          callback();
      })
    .catch(error => {
      console.error(error);
    });
    this.setState({ library: results });
  }

  entry = async(isbn, author, title, description, coverArt) => {
    await this.setState({book: {
      isbn: isbn,
      author: author,
      title: title,
      description: description,
      coverArt: coverArt,
    }
    });
    var joined = this.state.library.concat(this.state.book);
    this.setState({ library: joined });
    this.save();
  }

  save = async() => {
    console.log(this.state.library);
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
        this.setState({ library: JSON.parse(library) });
      }
    }
    catch (err) {
      alert(err);
    }
  }

  render(){
    return (
      <SafeAreaView style={{alignItems:"center",flex:1,justifyContent:"center",}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={{flex: 1, justifyContent: "flex-end", }}>
            <Button title="close" onPress={()=> this.setState({modalVisible: false})} />
            <View style={{height: "50%", backgroundColor: "#fff", alignItems: "center", padding:20,}}>
              <Text style={styles.itemTitle}>{this.state.book.title + "\n"}</Text>
              <Text style={styles.itemAuthor}>{this.state.book.author + "\n"}</Text>
              <Text style={styles.itemText}>{"\t" + this.state.book.description + "\n\n" + "ISBN: " + this.state.book.isbn}</Text>
            </View>
          </View>
        </Modal>

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "100%"}}
          onSubmitEditing={(event)=> this.searchLibrary(event.nativeEvent.text)}
        />
          <FlatList
          style={styles.container}
          numColumns='3'
          data={this.state.library}
          keyExtractor={( item ) => item.isbn}
          renderItem = {( {item} ) => (
            <TouchableOpacity
              style={styles.item}
              onPress={()=>this.inspectBook(item)}>
              <ImageBackground source={{ uri: item.coverArt }} style={styles.item}>
              </ImageBackground>
            </TouchableOpacity>
          )}/>

        <View style={{flexDirection: "row"}}>
          <Button onPress={() => this.sample()} title="sample"/>
          <Button onPress={() => this.componentDidMount()} title="refresh"/>
        </View>

      </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
      marginVertical: 0,
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
  inspect: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width: (Dimensions.get('window').width / numColumns - (3)) - 3,
    height: (Dimensions.get('window').width / numColumns * 1.5) - 3,
    margin: 1.5,
  },
});

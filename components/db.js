import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Button, TouchableOpacity, Modal, Image, ImageBackground, SafeAreaView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


const numColumns = 3;

export default class Lib extends React.Component{
  constructor(props) {
    super(props);
    this.state= { library: [], modalVisible: false, searching: false, search: [],
      book: {
        isbn: "isbn",
        author: "author",
        title: "title",
        description: "description",
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
    var library = this.state.library;
    var regex = new RegExp(input, "i");
    var results = [];
    if (input){
      this.setState({searching: true});
      console.log(library);
      library.forEach((book) => {
        if (book.title.match(regex)){
          results.push(book);       
        };
      });
    }
    else{
      this.setState({searching: false});
    }
    this.setState({ search: results });
  }

  clearlibrary = async () => {
    this.setState({library: []});
    try {
      await AsyncStorage.setItem("library", JSON.stringify([]));
    }
    catch (err) {
      alert(err);
    }
  }

  async sample(){
    await this.entry("0439023521", "Suzanne Collins", "The Hunger Games", "In the ruins of a place once known as North America lies the nation of Panem, a shining Capitol surrounded by twelve outlying districts. The Capitol is harsh and cruel and keeps the districts in line by forcing them all to send one boy and one girl between the ages of twelve and eighteen to participate in the annual Hunger Games, a fight to the death on live TV. Sixteen-year-old Katniss Everdeen, who lives alone with her mother and younger sister, regards it as a death sentence when she is forced to represent her district in the Games. But Katniss has been close to dead before - and survival, for her, is second nature. Without really meaning to, she becomes a contender. But if she is to win, she will have to start making choices that weigh survival against humanity and life against love.");
    await this.entry("0765376679", "Brandon Sanderson", "The Way of Kings: Book One of the Stormlight Archive", "Description");
    await this.entry("038552885X", "Stephen King", "The Stand", "Description  ");
  }

  entry = async(isbn, author, title, description) => {
    await this.setState({book: {
      isbn: isbn,
      author: author,
      title: title,
      description: description,
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
      <SafeAreaView style={{alignItems:"center",flex:1,justifyContent:"center"}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}        
        >
          {/* <ImageBackground
            source={require("../assets/reading.png")}
            style={{width: "100%", height: "100%"}}
          > */}
          <View style={{flex: 1, justifyContent: "flex-end"}}>
            <Button title="close" onPress={()=> this.setState({modalVisible: false})} />
            <View style={{height: "50%", backgroundColor: "#fff", alignItems: "center"}}>
              <Text style={{textAlign: "center"}}>{this.state.book.title + "\n" + this.state.book.author + "\n" + this.state.book.description + "\n" + "ISBN: " + this.state.book.isbn}</Text>
            </View>
          </View>
          {/* </ImageBackground> */}
        </Modal>

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: "100%"}}
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
              <Text style={styles.itemText}>{item.title + "\n\n" + item.author}</Text>
            </TouchableOpacity>
          )}/> :
          <View style ={{flex:1}}>
            
            <FlatList 
            style={styles.container}
            numColumns='3'
            data={this.state.search}
            keyExtractor={( item ) => item.isbn}
            renderItem = {( {item} ) => (
              <TouchableOpacity 
                style={styles.item}
                onPress={()=>this.inspectBook(item)}>
                <Text style={styles.itemText}>{item.title + "\n\n" + item.author}</Text>
              </TouchableOpacity>
            )}/>
            <Text>Searching</Text>
          </View>
        }

        <View style={{flexDirection: "row"}}>
          <Button onPress={() => this.clearlibrary()} title="clear"/>
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
      color: '#fff',
      textAlign: "center"
  },
  inspect: {
    justifyContent: 'center', 
    alignItems: 'center'
  }
}); 

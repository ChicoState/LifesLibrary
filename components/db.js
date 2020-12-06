import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Button, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


const numColumns = 3;

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);


export default class Lib extends React.Component{
  constructor(props) {
    super(props);
    this.state= { library: [],
      book: {
        isbn: "isbn",
        author: "author",
        title: "title",
        description: "description",
  }};
  };

  componentDidMount(){
    this.load();
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
    this.save(this.state.book);
  }

  addtolibrary(book){
    var joined = this.state.library.concat(book);
    this.setState({ library: joined })
  }

  save = async(book) => {
    this.addtolibrary(book);
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
        this.setState({ library: JSON.parse(library) })
      }
    }
    catch (err) {
      alert(err);
    }
  }

  render(){
    return (
      <View style={{alignItems:"center",flex:1,justifyContent:"center"}}>

        <FlatList 
          style={styles.container}
          numColumns='3'
          data={this.state.library}
          keyExtractor={( item ) => item.isbn}
          renderItem = {( {item} ) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.title}</Text>
              <Text style={styles.itemText}>{item.isbn}</Text>
              <Text style={styles.itemText}>{item.author}</Text>
            </View>
          )}
        />
        <Button onPress={() => this.clearlibrary()} title="clear"/>
        <Button onPress={() => this.sample()} title="sample"/>
        <Button onPress={() => this.load()} title="refresh"/>
      </View>
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
  },
});
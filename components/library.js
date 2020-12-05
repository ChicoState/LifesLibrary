import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import AddBook from './addbook';
import firebase from './Firebase';
import Searchbar from './searchbar'
import BookCommit from './bookCommit'
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('media.db');
const numColumns = 3;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      dataTodo: [],
      search: ""
    };
  }

  async componentWillMount() {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exist books  (ISBN text primary key not null, ggLink text, coverLink text, title text, desc text, author text, pagecnt integer);'
      );
    });
    this.setState({loading: false})
  }

  async componentDidMount() {
    const { search } = this.state;
    await this.fetchData(search);
  }

  async handleSearch(val){
    this.setState({search: val});
    await this.fetchData(val);
  }
  fetchData(search){
    var query = "SELECT * FROM books WHERE title LIKE '%" + search + "%'";
    var params = [];
    db.transaction((tx) =>{
      tx.executeSql(query, params, (tx, results) => {
        conlose.log(results);
        if(results.rows._array.length > 0){
          this.setState({
            dataTodo: results.rows._array;
          });
        }, function (tx, err) {
            Alert.alert("Welcome");
        }
      });
    });
  }
  render() {
    return (

        <View style={styles.container}>
        <SearchBar
          placeholder="Search by name"
          onChangeText={(val) => this.handleSearch(val)} value={this.state.search} value={this.state.search}
          containerStyle={{borderWidth: 2, marginTop: 10}}
            <FlatList
                data={this.state.dataTodo}
                style={styles.container}
                numColumns={numColumns}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem = {({ item, index }) => {
                    if (item.empty === true) {
                    return <View style={[styles.item, styles.itemInvisible]} />;
                    }
                    return (
                    <View style={styles.item}>
                        <Text style={styles.itemText}>{item.title}</Text>
                        <Text style={styles.itemText}>{item.author}</Text>
                    </View>
                    )}}
            />
            <View style={{ position:'absolute', bottom: 5, right: 5}}>
            </View>
        </View>
        );
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

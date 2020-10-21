import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import AddBook from './addbook';
import Create from './Create'
import firebase from './Firebase';
const numColumns = 3;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('book');
    this.unsubscribe = null;
    this.state = {
      books: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const books = [];
    querySnapshot.forEach((doc) => {
      const { title, author, published } = doc.data();
      books.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        published,
        author,
      });
    });
    this.setState({
      books
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  render() {
    return (
        <View style={styles.container}>
            <FlatList
                data={this.state.books}
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
                    </View>
                    )}}
            />
            <View style={{ position:'absolute', bottom: 5, right: 5}}>
                <AddBook/>
            </View>
            <Create/>
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

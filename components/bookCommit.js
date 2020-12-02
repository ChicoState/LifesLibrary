import React, { Component } from 'react';
import { Button, TextInput, View } from 'react-native';
import Firebase from "./Firebase"
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('media.db');
export default class Add extends Component {

  // constructor(props) {
  //   super(props);
  //   this.ref = Firebase.firestore().collection('bookRefs');
    // state = {ISBN:'',coverImage:'',GGLink:'',searchString:''}

    insert(ISBN){
      var ggLink = "https://www.googleapis.com/books/v1/volumes?q=" + ISBN
      var coverLink = 'http://covers.openlibrary.org/b/isbn/' + ISBN + '-M.jpg'
      var query = "INSERT INTO books (ISBN,ggLink,coverLink) VALUES (?,?,?)";
      var params = [ISBN,ggLink,coverLink];
      db.transaction((tx) => {
        tx.executeSql(query,params, (tx, results) => {
            console.log(results);
            Alert.alert("Success");
            return true;
          }, function (tx, err) {
            Alert.alert("Unsuccessful");
            return false;
        });
      });
    }
  //   this.onChange = this.onChange.bind(this);
  //   this.onSubmit = this.onSubmit.bind(this);
  // }
  // onChange = (value) => {
  //   const state = this.state
  //   state['searchString'] = value;
  //   this.setState(state);
  // }
  //
  // onSubmit = () => {
  //   const {searchString } = this.state.searchString;
  //   fetch("https://www.googleapis.com/books/v1/volumes?q=" + searchString)
  //   .then(response => response.json())
  //   .then(data => {
  //     this.setState({
  //       ISBN: response[0]["volumeInfo"]["industryIdentifiers"][0]['identifier'],
  //       GGLink: response[0]["selfLink"]["industryIdentifiers"],
  //       coverImage: 'http://covers.openlibrary.org/b/isbn/' + response[0]["volumeInfo"]["industryIdentifiers"][0]['identifier'] + '-M.jpg'
  //     });
  //   })
  //   const { ISBN, coverImage, GGLink } = this.state;
  //   this.ref.add({
  //     ISBN,
  //     coverImage,
  //     GGLink
  //   }).then((docRef) => {
  //     this.setState({
  //       ISBN: '',
  //       coverImage: '',
  //       GGLink: '',
  //       searchString:''
  //     });
  //     this.props.history.push("/")
  //   })
  //   .catch((error) => {
  //     console.error("Error adding document: ", error);
  //   });
  // }
  // render() {
  //   const { searchString } = this.state.searchString;
  //   return (
  //       <View>
  //        <Button onPress={this.onSubmit} title="Submit" />
  //        <TextInput
  //          onChangeText={this.onChange}
  //          value={searchString}
  //        />
  //      </View>
  //   );
  // }
}

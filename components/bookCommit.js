import React, { Component } from 'react';
import { Button, TextInput, View } from 'react-native';
import Firebase from "./Firebase"
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('media.db');
export default class Add extends Component {

  constructor(props) {
    super(props);
    state = {ISBN:'',coverImage:'',GGLink:'',title:'',desc:'',author:'',pagecnt:0}
}
    insert(ISBN){
      var ggLink = "https://www.googleapis.com/books/v1/volumes?q=" + ISBN
      var coverLink = 'http://covers.openlibrary.org/b/isbn/' + ISBN + '-M.jpg'
      fetch(`ggLink`)
          .then(response => response.json())
          .then(responseJson => {
              this.setState({
                ISBN: isbn,
                coverImage: coverLink,
                GGLink: ggLink,
                title: responseJson.items[0].volumeInfo.title,
                desc: responseJson.items[0].volumeInfo.description,
                author: responseJson.items[0].volumeInfo.authors,
                pagecnt: responseJson.items[0].volumeInfo.pageCount,
               });
              callback();
          })
      .catch(error => {
        console.error(error);
      });
      var query = "INSERT INTO books (ISBN,ggLink,coverLink,title, desc, author, pagecnt) VALUES (?,?,?,?,?,?,?)";
      var params = [this.state.ISBN,this.state.ggLink,this.state.coverLink,this.state.title,this.state.desc,this.state.authors,this.state.pagecnt];
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

import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
// import './App.css';
import firebase from './Firebase';

class App extends Component {
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
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              BOOK LIST
            </h3>
          </div>
          <div class="panel-body">
                <Router>
            <h4><Link to="/create">Add Book</Link></h4>
                  </Router>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Publish</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map(book =>
                  <tr>
                      <Router>
                    <td><Link to={`/show/${book.key}`}>{book.title}</Link></td>
                        </Router>
                    <td>{book.published}</td>
                    <td>{book.author}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

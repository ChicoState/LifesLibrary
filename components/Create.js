import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('book');
    this.state = {
      title: '',
      published: '',
      author: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, published, author } = this.state;

    this.ref.add({
      title,
      published,
      author
    }).then((docRef) => {
      this.setState({
        title: '',
        published: '',
        author: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { title, published, author } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD BOOK
            </h3>
          </div>
          <div class="panel-body">
              <Router>
            <h4><Link to="/" class="btn btn-primary">Book List</Link></h4>
                </Router>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="description">published:</label>
                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{published}</textArea>
              </div>
              <div class="form-group">
                <label for="author">Author:</label>
                <input type="text" class="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;

import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      published: '',
      author: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('book').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const board = doc.data();
        this.setState({
          key: doc.id,
          title: board.title,
          published: board.published,
          author: board.author
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, description, author } = this.state;

    const updateRef = firebase.firestore().collection('book').doc(this.state.key);
    updateRef.set({
      title,
      published,
      author
    }).then((docRef) => {
      this.setState({
        key: '',
        title: '',
        published: '',
        author: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT BOOK
            </h3>
          </div>
          <div class="panel-body">
              <Router>
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Book List</Link></h4>
                </Router>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="published">published:</label>
                <input type="text" class="form-control" name="description" value={this.state.published} onChange={this.onChange} placeholder="Description" />
              </div>
              <div class="form-group">
                <label for="author">Author:</label>
                <input type="text" class="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="Author" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;

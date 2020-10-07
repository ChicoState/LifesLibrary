import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('book').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('book').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
              <Router>
          <h4><Link to="/">Board List</Link></h4>
            <h3 class="panel-title">
              {this.state.board.title}
            </h3>
                </Router>
          </div>
          <div class="panel-body">
            <dl>
              <dt>Description:</dt>
              <dd>{this.state.board.published}</dd>
              <dt>Author:</dt>
              <dd>{this.state.board.author}</dd>
            </dl>
            <Router>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
                </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;

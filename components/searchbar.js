import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';

export default class App extends Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });

  };

  render() {
    
    const { search } = this.state;

    return (
      <SearchBar
        placeholder="Type Here..."
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}

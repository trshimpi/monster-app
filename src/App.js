import './App.css';
import React, { Component } from 'react'
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    }

    /**
     * if function definition does not use arrow function then we have to 
     * explicitely bind the context of "this" to App class and we have to do it 
     * for all the functions which are using the context of "App" class.
     *      this.handleChange = this.handleChange.bind(this);
     */ 
  }

  // runs after component is mounted on the page ... lifecycle method same as android
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(users => this.setState({ monsters: users }))
  }

  /**
   * if arrow function is used in function definition then we don't
   * have to explicitely bind the context of "this" keyword to "App" class
   */

  handleChange = e =>{
    this.setState({ searchField: e.target.value });
  }

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    )

    return (
      <div className="App">
      <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder="search monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    )
  }
}

export default App;

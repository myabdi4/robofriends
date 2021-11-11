import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox  from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from "../ERRORBOUNDRY.js";
import'./App.css';

//declaring a class 
class App extends Component {
  // declare the state 
  constructor(){
    super()
    this.state = {
      robots: [], 
      searchfield: ''
    } 
    // End of constructor 
  }

  // Mount Component 
  componentDidMount(){
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {this.setState({ robots: users })});
  }
  // this helps filter the search
  onSearchChange = (event) => {
    this.setState ({ searchfield: event.target.value })
  }

  // start pf render 
  render() {
    const { robots, searchfield} = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase())
    })
    return !robots.length? 
      <h1> Loading </h1>:
      (
        <div className = 'tc'>
          <h1 className = 'f1'> RoboFriends </h1>
          <SearchBox searchChange = {this.onSearchChange}/>
          <Scroll>
            <ErrorBoundry>
              <CardList robots = {filteredRobots}/>
            </ErrorBoundry>
            </Scroll>
        </div>
      ); 
    } 
    }
  // End fo Render
export default App;
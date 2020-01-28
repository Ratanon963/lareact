import React, { Component } from 'react';
import axios from 'axios';
import Loading from './Loading';

class App extends Component {
  constructor(props) {
    super(props)
    //State
    this.state = {
      users: [],
      loading: false
    };

    //Bind
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getUsers() {
    this.setState({
      loading: true
    })
    axios('https://api.randomuser.me/?nat=US&results=5').then(response =>
      this.setState({
        users: [...this.state.users, ...response.data.results],   // Get data to array and concat
        loading: false
      })
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    this.getUsers();
    console.log('more users loaded');
  }

  componentWillMount() {
    this.getUsers();

  }

  render() {
    const { loading, users } = this.state

    return (
    <div className='App'>
      <form onSubmit={this.handleSubmit}>
        <input type="submit" value="load users" />
      </form>
      <hr />

      {!loading ? (
        users.map(user => (
          // Add unique key 
          <div key={user.id.value}>
            <h3 style={{ color: 'red' }} >{user.name.first}</h3>
            <p>{user.email}</p>
            <hr />
          </div>
        ))
      ) : (
          < Loading meassage ="Hey hey hey...." />
        )}
    </div>);
  }
}



export default App;

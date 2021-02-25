import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserList from './components/UserList/userList'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/userList"
          render={props => <UserList {...props} />} />
      </BrowserRouter>
    </div>
  );
}

export default App;

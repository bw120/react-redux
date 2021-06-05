import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUsers,
  userData,
} from '../reducers/users';
import Post from './Post';
import Home from './Home';
import './App.css';

function App() {
  const users = useSelector(userData);
  const dispatch = useDispatch();

  // load user list on mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <Router>
      <div className="app">
        <div className="container">
        <Switch>
          <Route path="/post/:userId">
            <Post users={users}/>
          </Route>
          <Route path="/">
            <Home users={users}/>
          </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

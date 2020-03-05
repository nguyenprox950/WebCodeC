import React, { Component } from 'react';
import '../app/App.css';
import { Route, Switch } from 'react-router-dom';
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import Home from '../components/Home'
import Introduction from '../components/Introduction'
import Profile from '../components/Profile'

function App() {
  // let header;
  // if (username !== null) {
  //   header = (<Header/>)
  // } else {
  //   header = null
  // }
  return (
    // {header}
    <Switch>
      <Route exact path="/SignIn" component={SignIn} />
      <Route exact path="/SignUp" component={SignUp} />
      <Route exact path="/Home" component={Home} />
      <Route exact path="/" component={Home} />
      <Route exact path="/Introduction" component={Introduction} />
      <Route exact path="/Profile" component={Profile} />
    </Switch>
  );
}

export default App;

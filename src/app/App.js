import React, { Component, useEffect } from 'react';
import '../app/App.css';
import { Route, Switch } from 'react-router-dom';
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import Home from '../components/Home'
import Introduction from '../components/Introduction'
import { useDispatch } from 'react-redux';
import { signInAction } from '../redux/action/userAction';
import UserLayout from '../layout/UserLayout';
import ProfileLayout from '../layout/ProfileLayout';
import ProfileInform from '../components/ProfileInform';
import ProfileChangePassword from '../components/ProfileChangePassword';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const userInform = JSON.parse(localStorage.getItem('user'))
    if(userInform) {
      dispatch(signInAction(userInform))
    }
  },[])
  return (
    <Switch>
    <Route exact path="/SignIn" component={SignIn} />
    <Route exact path="/SignUp" component={SignUp} />
    <UserLayout path="/">
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/Home" component={Home} />
      <Route exact path="/Introduction" component={Introduction} />
      <ProfileLayout path="/Profile">
        <Switch>
          <Route path="/Profile/ProfileInform" component={ProfileInform} />
          <Route path="/Profile/ProfileChangePassword" component={ProfileChangePassword} />
        </Switch>
      </ProfileLayout>
    </Switch>
    </UserLayout>
    </Switch>
  );
}

export default App;

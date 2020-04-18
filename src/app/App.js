import React, { Component, useEffect } from 'react'
import '../app/App.css';
import { Route, Switch } from 'react-router-dom'
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import Home from '../components/Home'
import Introduction from '../components/Introduction'
import { useDispatch } from 'react-redux'
import { signInAction } from '../redux/action/userAction'
import UserLayout from '../layout/UserLayout'
import ProfileLayout from '../layout/ProfileLayout'
import ProfileInform from '../components/ProfileInform'
import ProfileChangePassword from '../components/ProfileChangePassword'
import Compiler from '../components/Compiler'
import TestLayout from '../layout/TestLayout'
import CheckCode from '../components/CheckCode'
import Translate from '../components/Translate'
import Test from '../components/Test'

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
    {/* <Route exact path="/Test" component={Test} /> */}
    <Route exact path="/SignIn" component={SignIn} />
    <Route exact path="/SignUp" component={SignUp} />
    <UserLayout path="/">
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/Home" component={Home} />
      <Route exact path="/Introduction" component={Introduction} />
      <Route exact path="/Compiler" component={Compiler} />
      <Route exact path="/Translate" component={Translate} />
      <ProfileLayout path="/Profile">
        <Switch>
          <Route path="/Profile/ProfileInform" component={ProfileInform} />
          <Route path="/Profile/ProfileChangePassword" component={ProfileChangePassword} />
        </Switch>
      </ProfileLayout>
      <TestLayout path="/Test">
        <Switch>
            <Route path="/Test/CheckCode" component={CheckCode} />
          </Switch>
      </TestLayout>
    </Switch>
    </UserLayout>
    </Switch>
  );
}

export default App;

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
import LectureLayout from '../layout/LectureLayout'
import ProfileLayout from '../layout/ProfileLayout'
import ProfileInform from '../components/ProfileInform'
import ProfileChangePassword from '../components/ProfileChangePassword'
import Compiler from '../components/Compiler'
import TestLayout from '../layout/TestLayout'
import CheckCode from '../components/CheckCode'
import Translate from '../components/Translate'
import Lecture from '../components/Lecture'
import HomeWork from '../components/HomeWork'
import HomeWorkStudent from '../components/HomeWorkStudent'
import Bang from '../components/Bang'
import UserAuth from '../components/UserAuth'
import TableOfStudents from '../components/TableOfStudents'
import TableOfLecture from '../components/TableOfLecture'
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
    {/* <Route exact path="/test" component={Test} /> */}
    <Route exact path="/signin" component={SignIn} />
    <Route exact path="/signup" component={SignUp} />
    <UserLayout path="/">
      <Switch>
      <Route exact path="/" component={Home} />
      <UserAuth exact path="/tableofstudents" component={TableOfStudents} />
      <UserAuth exact path="/tableoflecture" component={TableOfLecture} />
      <Route exact path="/mustsignin" component={Bang} />
      <Route exact path="/introduction" component={Introduction} />
      <UserAuth exact path="/compiler" component={Compiler} />
      <UserAuth exact path="/translate" component={Translate} />
      <UserAuth exact path="/homework" component={HomeWork} />
      <Route exact path="/mustsignin" component={Bang} />
      <UserAuth exact path="/homeworkstudent" component={HomeWorkStudent} />
      <ProfileLayout path="/profile">
        <Switch>
          <UserAuth path="/profile/inform" component={ProfileInform} />
          <UserAuth path="/profile/changepassword" component={ProfileChangePassword} />
        </Switch>
      </ProfileLayout>
      <TestLayout path="/test">
        <Switch>
            <UserAuth path="/test/checkcode" component={CheckCode} />
          </Switch>
      </TestLayout>
      <LectureLayout path="/studyc">
      <UserAuth exact path="/studyc/lecture" component={Lecture} />
      </LectureLayout>
    </Switch>
    </UserLayout>
    </Switch>
  );
}

export default App;

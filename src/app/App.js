import React, { useEffect } from 'react'
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
import HomeworkLayout from '../layout/HomeworkLayout'
import ProfileInform from '../components/ProfileInform'
import ProfileChangePassword from '../components/ProfileChangePassword'
import Compiler from '../components/Compiler'
import TestLayout from '../layout/TestLayout'
import CheckCode from '../components/CheckCode'
import Translate from '../components/Translate'
import Lecture from '../components/Lecture'
import HomeworkStudents from '../components/HomeworkStudents'
import Bang from '../components/Bang'
import UserAuth from '../components/UserAuth'
import TableOfStudents from '../components/TableOfStudents'
import TableOfLecture from '../components/TableOfLecture'
import HomeworkTeacher from '../components/HomeworkTeacher'
import TableMark from '../components/TableMark'
import TableOfHomework from '../components/TableOfHomework'
import GPA from '../components/GPA'
import CountDownTime from '../components/CountDownTime'
import Homework from '../components/Homework'
import HomeworkSubmit from '../components/HomeworkSubmit'

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
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <UserLayout path="/">
      <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/gpa" component={GPA} />
      <Route path="/homeworkteacher" component={HomeworkTeacher} />
      <UserAuth path="/tableoflecture" component={TableOfLecture} />
      <UserAuth path="/tableofhomework" component={TableOfHomework} />
      <UserAuth path="/tablemark" component={TableMark} />
      <Route path="/mustsignin" component={Bang} />
      <Route path="/introduction" component={Introduction} />
      <UserAuth path="/compiler" component={Compiler} />
      <UserAuth path="/translate" component={Translate} />
      <Route path="/mustsignin" component={Bang} />
      <ProfileLayout path="/profile">
        <Switch>
          <UserAuth path="/profile/:ID/Inform" component={ProfileInform} />
          <UserAuth path="/profile/:ID/changepassword" component={ProfileChangePassword} />
        </Switch>
      </ProfileLayout>
      <TestLayout path="/checkcode">
        <Switch>
            <UserAuth path="/checkcode/test:ID" component={CheckCode} />
        </Switch>
      </TestLayout>
      <HomeworkLayout path="/homework">
           <UserAuth path="/homework/test:ID" component={Homework} />
           <UserAuth path="/homework/table:ID" component={HomeworkSubmit} />
      </HomeworkLayout>
      <LectureLayout path="/studyc">
      <UserAuth path="/studyc/lecture" component={Lecture} />
      </LectureLayout>
    </Switch>
    </UserLayout>
    </Switch>
  );
}

export default App;

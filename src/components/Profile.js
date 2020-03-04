import React, {Component} from 'react';
import 'antd/dist/antd.css';
import '../css/Profile.css'
import { Menu } from 'antd';
import AppHeader from './AppHeader'
import { MyInput } from './MyInput'
import {firebaseApp} from '../components/Firebase'
import {ButtonToggle} from 'reactstrap';
import { Formik, Form } from 'formik'
import * as yup from 'yup'

let fullName, birthday, studentID, email, phoneNumber, password;

const { SubMenu } = Menu;


export default class Profile extends Component {
  handleClick = e => {
    console.log('click ', e);
  };

  validationSchema = yup.object({
    fullName:yup.string()
    .required("Vui lòng nhập đầy đủ họ tên")
    .matches(/^([^0-9]*)$/,"Tên chỉ bao gồm ký tự từ a-z")
    .max(30,"Tên quá dài")
    .min(5,"Tên quá ngắn"),
  
    birthday:yup.string()
    .required("Vui lòng nhập ngày sinh"),
  
    email:yup.string()
    .email('Email không hợp lệ')
    .required("Vui lòng nhập email"),
  
    studentID:yup.string()
    .required('Vui lòng nhập mã số sinh viên')
    .matches(/^([^a-z]*)$/,"Mã số sinh viên chỉ gồm 7 số từ 0-9")
    .max(7,"Mã số sinh viên bao gồm 7 số")
    .min(7,"Mã số sinh viên bao gồm 7 số"),
  
    phoneNumber:yup.string()
    .required('Vui lòng nhập mã số điện thoại')
    .matches(/^([^a-z]*)$/,"Số điện thoại chỉ gồm 10 số từ 0-9")
    .max(10,"Số điện thoại bao gồm 10 số")
    .min(10,"Số điện thoại bao gồm 10 số")
  })

  enableForm = () => {
    document.getElementById("fullName").disabled = false;
    document.getElementById("birthday").disabled = false;
    document.getElementById("studentID").disabled = false;
    document.getElementById("phoneNumber").disabled = false;
    document.getElementById("changeInform").hidden = true;
    document.getElementById("accept").hidden = false;
  }

  setData = () =>{
    firebaseApp.database().ref('userInform/' + localStorage.getItem('login')).child('fullName').on('value', function(snapshot){
      document.getElementById('fullName').value = snapshot.val()
        fullName = snapshot.val()
    })

    firebaseApp.database().ref('userInform/' + localStorage.getItem('login')).child('birthday').on('value', function(snapshot){
      document.getElementById('birthday').value = snapshot.val()
      birthday = snapshot.val()
    })

    firebaseApp.database().ref('userInform/' + localStorage.getItem('login')).child('email').on('value', function(snapshot){
      document.getElementById('email').value = snapshot.val()
      email = snapshot.val()
    })

    firebaseApp.database().ref('userInform/' + localStorage.getItem('login')).child('studentID').on('value', function(snapshot){
      document.getElementById('studentID').value = snapshot.val()
      studentID = snapshot.val()
    })

    firebaseApp.database().ref('userInform/' + localStorage.getItem('login')).child('phoneNumber').on('value', function(snapshot){
      document.getElementById('phoneNumber').value = snapshot.val()
      phoneNumber = snapshot.val()
    })

    firebaseApp.database().ref('userInform/' + localStorage.getItem('login')).child('password').on('value', function(snapshot){
      password = snapshot.val()
    })

  }

  handleSuccess = (values) => {
    document.getElementById("fullName").disabled = true;
    document.getElementById("birthday").disabled = true;
    document.getElementById("studentID").disabled = true;
    document.getElementById("phoneNumber").disabled = true;
    document.getElementById("changeInform").hidden = false;
    document.getElementById("accept").hidden = true;

    console.log(localStorage.getItem('login'))

    firebaseApp.database().ref('userInform/' + localStorage.getItem('login')).set ({
      fullName : values.fullName,
      birthday: values.birthday, 
      email: values.email, 
      studentID: values.studentID,         
      phoneNumber: values.phoneNumber, 
      password : password
    })
  }

  render() {
    this.setData()
    return (
      <div>
        <div>
          <AppHeader/>
        </div>
        <div className="mainProfile">
          <div id="leftProfile">
            <Menu
              onClick={this.handleClick}
              style={{ width: 256 }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
            >
              <Menu.Item key='1' >Thông tin cơ bản</Menu.Item>
              <Menu.Item key='2' >Đổi mật khẩu</Menu.Item>
            </Menu>
          </div>
          <div id ="rightProfile">
            <Formik
              const initialValues = {
                  {
                      fullName: fullName,
                      birthday: birthday,
                      email: email,
                      studentID: studentID,
                      phoneNumber: phoneNumber,
                  }
              }
              validationSchema = { this.validationSchema }
              onSubmit = {values => this.handleSuccess(values)}> 
              {({ handelSubmit }) =>
                <div>
                  <Form className = "formikProfile">
                    <p>Họ và Tên:</p>
                    <MyInput id="fullName" type = "text" name= "fullName" variant="outlined" disabled/>
                    <p>Ngày sinh:</p>
                    <MyInput id="birthday" type = "date" name= "birthday" variant="outlined" disabled/>
                    <p>Email:(Không thể thay đổi)</p>
                    <MyInput id="email" type = "email" name= "email" variant="outlined" />
                    <p>Mã số sinh viên:</p>
                    <MyInput id="studentID" type = "text" name= "studentID" variant="outlined" disabled/>
                    <p>Số điện thoại:</p>
                    <MyInput id="phoneNumber" type = "text" name= "phoneNumber" variant="outlined" disabled/>
                    <ButtonToggle id="accept" color="primary" onClick={handelSubmit} hidden>Xác nhận</ButtonToggle>
                    <ButtonToggle id="changeInform" color="primary" onClick={this.enableForm} >Thay đổi thông tin</ButtonToggle>
                  </Form> 
                </div>                 
              } 
            </Formik>                       
          </div>
        </div>
      </div>
    );
  }
}

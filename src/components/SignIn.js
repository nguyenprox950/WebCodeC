import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { MyInput } from './MyInput'
import '../css/SignIn.css'
import { firebaseApp } from '../components/Firebase'
import Swal from 'sweetalert2'
import * as yup from 'yup'


const validationSchema = yup.object({
    email: yup.string()
        .email('Email không hợp lệ')
        .required("Vui lòng nhập email"),

    password: yup.string()
        .required("Vui lòng nhập mật khẩu"),
})

const SignIn = (props) => {
    const [userInfor, setUserInfor] = useState({
        email: '',
        password: '',
    })

    const handleSuccess = (values) => {
        setUserInfor({
            email: values.email,
            password: values.password,
        })
        firebaseApp.auth().signInWithEmailAndPassword(values.email, values.password)
            .then(() => {
                var emailID = values.email.slice(0, values.email.indexOf("."))
                console.log(emailID)
                firebaseApp.database().ref('userInform/' + emailID).child('fullName').on('value', function(snapshot) {
                    Swal.fire(
                        'Chào mừng \n' + snapshot.val(),
                        'Đã đăng nhập thành công!',
                        'success'
                    )
                })
                localStorage.setItem('login', emailID)
                props.history.push('/Home')
            })
            .catch(function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Thất bại',
                    text: 'Tài khoản hoặc mật khẩu không đúng!',
                })
            });
    }
    return ( 
    <div >
        <Formik
        const initialValues = {
            {
                email: '',
                password: '',
            }
        }
        validationSchema = { validationSchema }
        onSubmit = { values => handleSuccess(values)}> 
        {({ handelSubmit }) =>
            <div className = "signInBody">
              <div className = "toSignIn">
                <div className = "formSignIn">
                  <h2 > Đăng nhập </h2> 
                  <img src = "../img/2.png" />
                  <Form className = "Formik">
                    <MyInput type = "email"name = "email"label = "Email" />
                    <MyInput type = "password" name = "password"label = "Mật khẩu" />
                    <button id = "signIn1"type = "submit"name = "SignIn" onClick = { handelSubmit }>Đăng nhập</button> 
                  </Form> 
                    <button id = "signIn2" type = "submit" name = "Back" value = "Đăng ký" onClick = {() => props.history.push('/SignUp') }>Đăng ký</button> 
                </div> 
              </div> 
            </div>
        } 
        </Formik> 
    </div>  
    );
}

export default SignIn
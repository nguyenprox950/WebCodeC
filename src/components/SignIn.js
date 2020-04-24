import React from 'react'
import { Formik, Form } from 'formik'
import { MyInput } from './MyInput'
import '../css/SignIn.css'
import * as yup from 'yup'
import { signIn } from '../redux/action/userAction'
import { useDispatch } from 'react-redux'


const validationSchema = yup.object({
    email: yup.string()
        .email('Email không hợp lệ')
        .required("Vui lòng nhập email"),

    password: yup.string()
        .required("Vui lòng nhập mật khẩu"),
})

const SignIn = (props) => {
    
    const dispatch = useDispatch()

    const handleSuccess = () => {
        props.history.replace('/Home')
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
        onSubmit = { values => dispatch(signIn(values, handleSuccess))}> 
        {({ handelSubmit }) =>
            <div className = "signInBody">
              <div className = "toSignIn">
                <div className = "formSignIn">
                  <h2 > Đăng nhập </h2> 
                  <img src = "../img/2.png" />
                  <Form className = "Formik">
                    <MyInput type = "email" name = "email"label = "Email" />
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
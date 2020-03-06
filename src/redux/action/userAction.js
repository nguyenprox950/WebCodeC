import {firebaseApp} from '../../components/Firebase'
import Swal from 'sweetalert2'
import { LOGIN } from '../constants/userConstants'

export const signUp = (values, handleSuccess) => {
    return dispatch => {
        firebaseApp.auth().createUserWithEmailAndPassword(values.email, values.password)
        .then(()=> {
            Swal.fire(
                'Chúc mừng!',
                'Bạn đã đăng ký thành công!',
                'success'
            )
            var emailID = values.email.slice(0, values.email.indexOf("."))
            firebaseApp.database().ref('userInform/' + emailID).set ({
                fullName : values.fullName,
                birthday: values.birthday, 
                email: values.email, 
                studentID: values.studentID,         
                phoneNumber: values.phoneNumber, 
                password: values.password
             })
             handleSuccess()
        })
    }  
}

export const signIn = (values, handleSuccess) => {
    return dispatch => {
        firebaseApp.auth().signInWithEmailAndPassword(values.email, values.password)
            .then(() => {
                var emailID = values.email.slice(0, values.email.indexOf("."))
                firebaseApp.database().ref('userInform/' + emailID).on('value', function(snapshot) {
                    Swal.fire(
                        'Chào mừng \n' + snapshot.val().fullName,
                        'Đã đăng nhập thành công!',
                        'success'
                    )
                    console.log(snapshot.val())
                    handleSuccess()
                    localStorage.setItem('user', JSON.stringify(snapshot.val()))
                    dispatch(signInAction(snapshot.val()))
                })
            })
            .catch(function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Thất bại',
                    text: 'Tài khoản hoặc mật khẩu không đúng!',
                })
            })
    }
}

export const changeInform = (values, handleSuccess) => {
    return dispatch => {
        var emailID = values.email.slice(0, values.email.indexOf("."))
        firebaseApp.database().ref('userInform/' + emailID).set ({
            fullName : values.fullName,
            birthday: values.birthday, 
            email: values.email, 
            studentID: values.studentID,         
            phoneNumber: values.phoneNumber, 
            password: values.password
        })
        firebaseApp.database().ref('userInform/' + emailID).on('value', function(snapshot) {
            Swal.fire(
                'Chúc mừng ',
                'Bạn đã thay đổi thông tin thành công!',
                'success'
            )
            handleSuccess()
            localStorage.setItem('user', JSON.stringify(snapshot.val()))
            dispatch(signInAction(snapshot.val()))
        })
    }  
}

export const changePassword = (values) => {
    return dispatch => {
        var user = firebaseApp.auth().currentUser;
        var emailID = values.email.slice(0, values.email.indexOf("."))

        user.updatePassword(values.password2).then(function() {
            Swal.fire(
                'Chúc mừng ',
                'Bạn đã thay đổi mật khẩu thành công!',
                'success'
            )
            firebaseApp.database().ref('userInform/' + emailID).set ({
                fullName : values.fullName,
                birthday: values.birthday, 
                email: values.email, 
                studentID: values.studentID,         
                phoneNumber: values.phoneNumber, 
                password: values.password2
            })
            firebaseApp.database().ref('userInform/' + emailID).on('value', function(snapshot) {
                localStorage.setItem('user', JSON.stringify(snapshot.val()))
                dispatch(signInAction(snapshot.val()))
            })
        }).catch(function(error) {
            Swal.fire({
                icon: 'error',
                title: 'Thất bại',
                text: 'Không thay đổi được mật khẩu!',
            })
        });
    }
}

export const signInAction = (data) => {
    return {
        type: LOGIN,
        data: data
    }
}
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
            var emailID = values.email.split(".").join("-");
            firebaseApp.database().ref('userInform/' + emailID).set ({
                fullName : values.fullName,
                birthday: values.birthday, 
                email: values.email, 
                studentID: values.studentID,         
                phoneNumber: values.phoneNumber, 
                password: values.password,
                role: "student"
             })
             handleSuccess()
        })
        .catch(function(error){
            Swal.fire({
                icon: 'error',
                title: 'Thất bại',
                text: 'Email đã tồn tại!',
            })
        })
    }  
}

export const signIn = (values, handleSuccess) => {
    return dispatch => {
        firebaseApp.auth().signInWithEmailAndPassword(values.email, values.password)
            .then(() => {
                var emailID = values.email.split(".").join("-");
                firebaseApp.database().ref('userInform/' + emailID).on('value', function(snapshot) {
                    Swal.fire(
                        'Chào mừng \n' + snapshot.val().fullName,
                        'Đã đăng nhập thành công!',
                        'success'
                    )
                    localStorage.setItem('user', JSON.stringify(snapshot.val()))
                    localStorage.setItem('emailID', emailID)
                    localStorage.setItem('role', snapshot.val().role)
                    dispatch(signInAction(snapshot.val()))
                })
                handleSuccess()
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

export const signInAction = (data) => {
    return {
        type: LOGIN,
        data: data
    }
}
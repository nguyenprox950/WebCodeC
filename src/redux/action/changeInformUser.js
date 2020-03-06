import {firebaseApp} from '../../components/Firebase'
import Swal from 'sweetalert2'
import { CHANGEINFORM } from '../constants/userConstants'

export const changeInform = (values) => {
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
        Swal.fire(
            'Chúc mừng ',
            'Bạn đã thay đổi thông tin thành công!',
            'success'
        )
        firebaseApp.database().ref('userInform/' + emailID).on('value', function(snapshot) {
            localStorage.setItem('user', JSON.stringify(snapshot.val()))
            dispatch(changeInformUser(snapshot.val()))
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
                dispatch(changeInformUser(snapshot.val()))
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

export const changeInformUser = (data) => {
    return {
        type: CHANGEINFORM,
        data: data
    }
}
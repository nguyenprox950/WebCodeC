import {firebaseApp} from '../../components/Firebase'
import Swal from 'sweetalert2'
import { CHANGEINFORM } from '../constants/userConstants'

export const changeInform = (values) => {
    return dispatch => {
        var emailID = values.email.split(".").join("-");
        firebaseApp.database().ref('userInform/' + emailID).set ({
            fullName : values.fullName,
            birthday: values.birthday, 
            email: values.email, 
            studentID: values.studentID,         
            phoneNumber: values.phoneNumber, 
            password: values.password,
            role: values.role
        })
        dispatch(changeInformUser(values))
        firebaseApp.database().ref('userInform/' + emailID).on('value', function(snapshot) {
            localStorage.setItem('user', JSON.stringify(snapshot.val()))
        })
        Swal.fire(
            'Chúc mừng ',
            'Bạn đã thay đổi thông tin thành công!',
            'success'
        )
    }  
}

export const changePassword = (values) => {
    return dispatch => {
        var user = firebaseApp.auth().currentUser;
        var emailID = values.email.split(".").join("-");

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
                password: values.password2,
                role: values.role
            })
            firebaseApp.database().ref('userInform/' + emailID).on('value', function(snapshot) {
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
import {firebaseApp} from '../../components/Firebase'
import { GET_DATASTUDENTS_ARRAY } from '../constants/userConstants'

export const getDataStudents = () => {
    return dispatch => {
        firebaseApp.database().ref('homeWork/CodeHistory(student)').orderByChild("studentID").once("value").then(function(snapshot) {
            let newArray = [], number = 0, color
            snapshot.forEach(function(childSnapshot) {
                const id = childSnapshot.key
                const time = childSnapshot.val().time
                const fullName = childSnapshot.val().fullName
                const studentID = childSnapshot.val().studentID
                const right = childSnapshot.val().Right.isRight
                const codeHistory = childSnapshot.val().history
                number = number + 1;
                console.log(right)
                if(right === true) {
                    color = 'green'
                } else if (right === false){
                    color = 'red'
                } else {
                    color = null
                }
                newArray.push({
                    id,
                    number,
                    color,
                    time,
                    fullName,
                    studentID,
                    right,
                    codeHistory
                })
            })
            dispatch(getDataAction(newArray))
        })
    }
}

export const getDataAction = (data) => {
    return {
        type: GET_DATASTUDENTS_ARRAY,
        data: data
    }
}
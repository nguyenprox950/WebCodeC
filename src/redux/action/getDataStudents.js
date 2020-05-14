import {firebaseApp} from '../../components/Firebase'
import { GET_DATASTUDENTS_ARRAY } from '../constants/userConstants'

export const getDataStudents = (number) => {
    return dispatch => {
        firebaseApp.database().ref('Homework/Test/Homework'+number+"/HistoryCode").orderByChild("studentID").once("value").then(function(snapshot) {
            let newArray = [], Number = 0, Color
            snapshot.forEach(function(childSnapshot) {
                const ID = childSnapshot.key
                const Time = childSnapshot.val().Time
                const FullName = childSnapshot.val().FullName
                const StudentID = childSnapshot.val().StudentID
                const Right = childSnapshot.val().isRight
                const CodeHistory = childSnapshot.val().History
                const Mark = childSnapshot.val().Mark
                Number = Number + 1;
                if(Right === true) {
                    Color = 'green'
                } else if (Right === false){
                    Color = 'red'
                } else {
                    Color = null
                }
                newArray.push({
                    ID,
                    Number,
                    Color,
                    Time,
                    FullName,
                    StudentID,
                    Right,
                    CodeHistory,
                    Mark
                })
            })
            dispatch(getDataStudentsAction(newArray))
        })
    }
}

export const getDataStudentsAction = (data) => {
    return {
        type: GET_DATASTUDENTS_ARRAY,
        data: data
    }
}
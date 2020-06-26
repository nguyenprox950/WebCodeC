import {firebaseApp} from '../../components/Firebase'
import { GET_DATAUSER_ARRAY} from '../constants/userConstants'

export const getGPA = () => {
    return dispatch => {
        firebaseApp.database().ref('userInform').orderByChild("studentID").once("value").then(function(snapshot) {
            let newArray = [], Number = 0, Score, GPA, Point, NumberOfHW;
            snapshot.forEach(function(childSnapshot) {
                Score = 0
                Point = 0
                NumberOfHW = 0;
                const Role = childSnapshot.val().role
                if(Role === "student") {
                    const Key = childSnapshot.key
                    const Email = childSnapshot.val().email
                    const FullName = childSnapshot.val().fullName
                    const StudentID = childSnapshot.val().studentID
                    const Birthday = childSnapshot.val().birthday
                    Number = Number + 1;
                    // firebaseApp.database().ref('Homework/Test').orderByChild("Number").once("value").then(function(snapshot) {
                    //     snapshot.forEach(function(childSnapshot) {
                    //         console.log(Key)
                    //         const ID = childSnapshot.key
                    //         const Mark = childSnapshot.child('HistoryCode/'+Key+"/Mark").val()
                    //         if (Mark === null) Point = 0
                    //         else if (Mark === 'Vui lòng nhập điểm' || Mark === 'Điểm không hợp lệ') Point = 0
                    //         else {
                    //             Point = Point + parseFloat(Mark)
                    //         }
                    //     })
                    // })
                    newArray.push({
                        Key,
                        Email,
                        FullName,
                        StudentID,
                        Birthday,
                        Number,
                        GPA
                    })
                }
            })
            dispatch(getGPAAction(newArray))
        })
    }
}


export const getGPAAction = (data) => {
    return {
        type: GET_DATAUSER_ARRAY,
        data: data
    }
}
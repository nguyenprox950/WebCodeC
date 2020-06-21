import {firebaseApp} from '../../components/Firebase'
import { GET_DATASTUDENTS_ARRAY, GET_MARK_ARRAY } from '../constants/userConstants'

export const getDataStudents = (number) => {
    return dispatch => {
        firebaseApp.database().ref('Homework/Test/Homework'+number+"/HistoryCode").orderByChild("StudentID").once("value").then(function(snapshot) {
            let newArray = [], Number = 0, Color, TimeRunCode
            snapshot.forEach(function(childSnapshot) {
                const ID = childSnapshot.key
                const Time = childSnapshot.val().Time
                const FullName = childSnapshot.val().FullName
                const StudentID = childSnapshot.val().StudentID
                const Right = childSnapshot.val().isRight
                const CodeHistory = childSnapshot.val().History
                const Mark = childSnapshot.val().Mark
                const TimeCode = childSnapshot.hasChild("TimeRunCode")
                if(TimeCode === false) TimeRunCode = '0s'
                else TimeRunCode = childSnapshot.val().TimeRunCode
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
                    Mark,
                    TimeRunCode
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

export const getMark = () => {
    return dispatch => {
        firebaseApp.database().ref('Homework/Test').orderByChild("Number").once("value").then(function(snapshot) {
            let newArray = [], Color, Score, Num = 0
            snapshot.forEach(function(childSnapshot) {
                const ID = childSnapshot.key
                const Number = childSnapshot.val().Number
                const Title = childSnapshot.val().Title
                const Mark = childSnapshot.child('HistoryCode/'+localStorage.getItem("emailID")+"/Mark").val()
                if (Mark === null) Score = "Chưa làm bài"
                else Score = Mark
                const CodeHistory = childSnapshot.child('HistoryCode/'+localStorage.getItem("emailID")+"/History").val()
                const Time = childSnapshot.child('HistoryCode/'+localStorage.getItem("emailID")+"/Time").val()
                const Right = childSnapshot.child('HistoryCode/'+localStorage.getItem("emailID")+"/isRight").val()
                Num = Num + 1
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
                    Num,
                    Title,
                    Color,
                    Score,
                    Time,
                    CodeHistory,
                })
            })
            dispatch(getMarkAction(newArray))
        })
    }
}

export const getMarkAction = (data) => {
    return {
        type: GET_MARK_ARRAY,
        data: data
    }
}
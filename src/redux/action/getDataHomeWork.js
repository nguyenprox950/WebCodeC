import {firebaseApp} from '../../components/Firebase'
import { GET_DATAHOMEWORK_ARRAY, GET_HOMEWORKINFORM } from '../constants/userConstants'

export const getDataHomework = () => {
    return dispatch => {
        firebaseApp.database().ref('Homework/Test').orderByChild("Number").once("value").then(function(snapshot) {
            let newArray = [], Line = 0
            snapshot.forEach(function(childSnapshot) {
                const ID = childSnapshot.key
                const Title = childSnapshot.val().Title
                const Number = childSnapshot.val().Number
                Line = Line + 1
                newArray.push({
                    ID,
                    Title,
                    Number,
                    Line
                })
            })
            dispatch(getDataHomeworkAction(newArray))
        })
    }
}

export const getDataHomeworkAction = (data) => {
    return {
        type: GET_DATAHOMEWORK_ARRAY,
        data: data
    }
}

export const getHomeworkInform = () => {
    return dispatch => {
        firebaseApp.database().ref('Homework/Test').orderByChild("Number").once("value").then(function(snapshot) {
            let newArray = [], Color, Line = 0
            snapshot.forEach(function(childSnapshot) {
                const ID = childSnapshot.key
                const Title = childSnapshot.val().Title
                const Introduct = childSnapshot.val().Introduct
                const Deadline_Day = childSnapshot.val().Deadline_Day
                const NumberOfStudents = childSnapshot.child("HistoryCode").numChildren()
                const Number = childSnapshot.val().Number
                const Stop = childSnapshot.val().Stop
                Line = Line + 1
                if(Stop === 1) Color = "green"
                else if (Stop === 2) Color = "red"
                newArray.push({
                    ID,
                    Title,
                    Introduct,
                    Deadline_Day,
                    NumberOfStudents,
                    Number,
                    Color,
                    Line
                })
            })
            dispatch(getHomeworkInformAction(newArray))
        })
    }
} 

export const getHomeworkInformAction = (data) => {
    return {
        type: GET_HOMEWORKINFORM,
        data: data
    }
}

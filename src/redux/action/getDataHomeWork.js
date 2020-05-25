import {firebaseApp} from '../../components/Firebase'
import { GET_DATAHOMEWORK_ARRAY, GET_HOMEWORKINFORM, GET_TESTCASE, GET_TESTCASE_HOMEWORK } from '../constants/userConstants'

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

export const getTestcase = (number) => {
    return dispatch => {
        firebaseApp.database().ref('/Test/Test'+number+'/Expected_Output').once("value").then(function(snapshot) {
            let newArray = [], Number = 0
            snapshot.forEach(function(childSnapshot) {
                const ID = childSnapshot.key
                const Input = childSnapshot.val().Input
                const Output = childSnapshot.val().Output
                Number = Number + 1
                newArray.push({
                    ID,
                    Input,
                    Output,
                    Number
                })
            })
            dispatch(getTestcaseAction(newArray))
        })
    }
} 

export const getTestcaseAction = (data) => {
    return {
        type: GET_TESTCASE,
        data: data
    }
}

export const getTestcaseHomework = (number) => {
    return dispatch => {
        firebaseApp.database().ref('/Homework/Test/Homework'+number+'/Expected_Output').once("value").then(function(snapshot) {
            let newArray = [], Number = 0
            snapshot.forEach(function(childSnapshot) {
                const ID = childSnapshot.key
                const Input = childSnapshot.val().Input
                const Output = childSnapshot.val().Output
                Number = Number + 1
                newArray.push({
                    ID,
                    Input,
                    Output,
                    Number
                })
            })
            dispatch(getTestcaseHomeworkAction(newArray))
        })
    }
} 

export const getTestcaseHomeworkAction = (data) => {
    return {
        type: GET_TESTCASE_HOMEWORK,
        data: data
    }
}


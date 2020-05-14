import {firebaseApp} from '../../components/Firebase'
import { GET_DATAHOMEWORK_ARRAY } from '../constants/userConstants'

export const getDataHomeWork = () => {
    return dispatch => {
        firebaseApp.database().ref('Homework/Test').orderByChild("Number").once("value").then(function(snapshot) {
            let newArray = []
            snapshot.forEach(function(childSnapshot) {
                const id = childSnapshot.key
                const title = childSnapshot.val().Title
                const number = childSnapshot.val().Number
                newArray.push({
                    id,
                    title,
                    number,
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
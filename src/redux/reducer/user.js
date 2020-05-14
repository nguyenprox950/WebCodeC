import { LOGIN, CHANGEINFORM, GET_DATASTUDENTS_ARRAY, GET_DATAHOMEWORK_ARRAY } from "../constants/userConstants";

const initialState = {
    userInform: {},
    dataStudents: [],
    dataHomework:[]
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state, userInform: action.data 
            }
        }
        case CHANGEINFORM: {
            const userInform = {...state.userInform}
            userInform.fullName = action.data.fullName
            userInform.birthday = action.data.birthday
            userInform.email = action.data.email
            userInform.studentID = action.data.studentID
            userInform.phoneNumber = action.data.phoneNumber
            userInform.password = action.data.password
            return {
                ...state, userInform
            }
        }
        case GET_DATASTUDENTS_ARRAY: {
            return {
                ...state, dataStudents: action.data
            }
        }
        case GET_DATAHOMEWORK_ARRAY: {
            return {
                ...state, dataHomework: action.data
            }
        }
        default:
            return state;
    }
}

export default userReducer;
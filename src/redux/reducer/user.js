import { LOGIN, CHANGEINFORM } from "../constants/userConstants";

const initialState = {
    userInform: {}
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
        default:
            return state;
    }
}

export default userReducer;
import { LOGIN } from "../constants/userConstants";

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
        default:
            return state;
    }
}

export default userReducer;
import {
  LOGIN,
  CHANGEINFORM,
  GET_DATASTUDENTS_ARRAY,
  GET_DATAHOMEWORK_ARRAY,
  GET_MARK_ARRAY,
  GET_HOMEWORKINFORM,
  GET_TESTCASE,
  GET_TESTCASE_HOMEWORK,
  GET_DATAUSER_ARRAY
} from "../constants/userConstants";

const initialState = {
  userInform: {},
  dataStudents: [],
  dataHomework: [],
  dataMark: [],
  homeworkInform: [],
  testcase: [],
  testcaseHomework: [],
  dataUser: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        userInform: action.data,
      };
    }
    case CHANGEINFORM: {
      const userInform = { ...state.userInform };
      userInform.fullName = action.data.fullName;
      userInform.birthday = action.data.birthday;
      userInform.email = action.data.email;
      userInform.studentID = action.data.studentID;
      userInform.phoneNumber = action.data.phoneNumber;
      userInform.password = action.data.password;
      userInform.role = action.data.role;
      return {
        ...state,
        userInform,
      };
    }
    case GET_DATASTUDENTS_ARRAY: {
      return {
        ...state,
        dataStudents: action.data,
      };
    }
    case GET_DATAHOMEWORK_ARRAY: {
      return {
        ...state,
        dataHomework: action.data,
      };
    }
    case GET_MARK_ARRAY: {
      return {
        ...state,
        dataMark: action.data,
      };
    }
    case GET_HOMEWORKINFORM: {
      return {
        ...state,
        homeworkInform: action.data,
      };
    }
    case GET_TESTCASE: {
        return {
          ...state,
          testcase: action.data,
        };
    }
    case GET_TESTCASE_HOMEWORK: {
        return {
          ...state,
          testcaseHomework: action.data,
        };
    }
    case GET_DATAUSER_ARRAY: {
      return {
        ...state,
        dataUser: action.data,
      };
    }
    default:
      return state;
  }
};

export default userReducer;

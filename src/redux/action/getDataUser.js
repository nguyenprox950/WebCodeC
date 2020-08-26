import {firebaseApp} from '../../components/Firebase'
import { GET_DATAUSER_ARRAY} from '../constants/userConstants'

export const getGPA = () => {
    return dispatch => {
        firebaseApp.database().ref('userInform').orderByChild("studentID").once("value").then(function(snapshot) {
            let newArray = [], Number = 0;
            snapshot.forEach(function(childSnapshot) {
                const Role = childSnapshot.val().role
                if(Role === "student") {
                    const Key = childSnapshot.key
                    const Email = childSnapshot.val().email
                    const FullName = childSnapshot.val().fullName
                    const StudentID = childSnapshot.val().studentID
                    const Birthday = childSnapshot.val().birthday
                    console.log(Number)
                    firebaseApp.database().ref('Homework/Test').orderByChild("Number").once("value").then(function(snapshot) {
                        let newArrayS = [], Score, Num = 0, GPA = 0, Position, G = 0;
                        snapshot.forEach(function(childSnapshot) {
                            const Mark = childSnapshot.child('HistoryCode/'+Key+"/Mark").val()
                            if (Mark === null) Score = "Chưa làm bài"
                            else if (Mark === 'Vui lòng nhập điểm' || Mark === 'Điểm không hợp lệ') Score = "Chưa chấm điểm"
                            else if (Mark === "Chưa chấm điểm") Score = "Chưa chấm điểm"
                            else {
                                Score = Mark
                                G = G + parseFloat(Mark)
                            }
                            Num = Num + 1
                            newArrayS.push({
                                Num,
                                G,
                                Score
                            })
                        })
                        Position = newArrayS.length
                        Number = Number + 1;
                        if (Position !== 0) {
                          GPA = newArrayS[Position-1].G/newArrayS[Position-1].Num
                          console.log("GPA="+GPA)
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
                        dispatch(getGPAAction(newArray))
                    })
                }
            })
        })
    }
}


export const getGPAAction = (data) => {
    return {
        type: GET_DATAUSER_ARRAY,
        data: data
    }
}
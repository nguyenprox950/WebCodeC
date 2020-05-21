import React from 'react'
import { firebaseApp } from "../components/Firebase";

var Input, Output;

export const Test = (props) => {
    const getTestInform = (Number, Step) => {
        
      };

    const checkCode = () => {
        var t = 0
        for (var i = 1; i <= 3; i++) {
                t = t + 1
                console.log(i)
                firebaseApp
                .database()
                .ref("Test/Test3")
                .child("Expected_Output/Expect" + i + "/Input")
                .on("value", function (snapshot) {
                    if (snapshot.exists) {
                    Input = snapshot.val();
                    }
                });
                firebaseApp
                .database()
                .ref("Test/Test3")
                .child("Expected_Output/Expect" + i + "/Output")
                .on("value", function (snapshot) {
                    if (snapshot.exists) {
                    Output = snapshot.val();
                    }
                });
                console.log("i="+i+"\n"+"input="+btoa(unescape(encodeURIComponent(Input || "")))+"\n"+"output="+Output)
            };
        }
    return (
        <div>
            <button onClick={()=>checkCode()}></button>
        </div>
    )
}

export default Test

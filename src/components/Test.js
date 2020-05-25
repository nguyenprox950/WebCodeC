import React from 'react'
import { firebaseApp } from "../components/Firebase";

var Input, Output;

export const Test = (props) => {

    const checkCode = () => {
        console.log((new Date("2020-05-25T10:43Z").getTime()) - 25200000)
    }
    return (
        <div>
            <button onClick={()=>checkCode()}></button>
        </div>
    )
}

export default Test

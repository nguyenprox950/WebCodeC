import React from 'react'
import '../css/Lecture.css'
var PDF;

export const Lecture = () => {
    const setPDF = () => {
        var numberOfLecture = localStorage.getItem('Lecture');
        PDF = "../PDF/Lecture"+numberOfLecture+".PDF"
        return PDF;
    }
    return (
        <div className="Lecture">
            <iframe src={setPDF()} width ="1075px" height="765px"></iframe>
        </div>
    )
}

export default Lecture

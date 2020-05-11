import React from "react";
import "../css/Lecture.css";
var PDF;

export const Lecture = () => {
  const setPDF = () => {
    var numberOfLecture = localStorage.getItem("Lecture");
    if (numberOfLecture === '1') return "https://drive.google.com/file/d/121xkWOSpTMRXwpOrIlG3-M0SvpxrHkmP/preview"
    else if (numberOfLecture === '2') return "https://drive.google.com/file/d/1uahZNVO24yx1G10cnDE6oPYcYEqyIDd9/preview"
    else if (numberOfLecture === '3') return "https://drive.google.com/file/d/1NDXZHdD5TG4O9WfypYp-Ws6GtwQGNt_Y/preview"
    else if (numberOfLecture === '4') return "https://drive.google.com/file/d/1uKcyhHCeiLBjl7B3iLsLpw6kVB63FCq5/preview"
    else if (numberOfLecture === '5') return "https://drive.google.com/file/d/1KJDITDLx9G5Zb_e1ecq9uMN_M42QTdbN/preview" 
    else if (numberOfLecture === '6') return "https://drive.google.com/file/d/1PXbSPmUzhbEL0B2nIH5SE6Q4RUn3uJ-s/preview"
    else if (numberOfLecture === '7') return "https://drive.google.com/file/d/1XThYmrJS7MK4-CqV3qsZPG9H5yJKbbp_/preview" 
    else if (numberOfLecture === '8') return "https://drive.google.com/file/d/1N8kmJNJVTLka1_gKLQl9Z6qjSQuXQjsY/preview" 
    else if (numberOfLecture === '9') return "https://drive.google.com/file/d/18GDgcd_tt7bNe9OthzUlnobobEJ4ivLU/preview" 
    else if (numberOfLecture === '10') return "https://drive.google.com/file/d/1AvaB5Z2kwfCsAPuhyLjCtyXbl_CIdoLX/preview" 
    else return null
  };
  return (
    <div className="Lecture">
      <iframe src={setPDF()} width="920px" height="765px"></iframe>
    </div>
  );
};

export default Lecture;

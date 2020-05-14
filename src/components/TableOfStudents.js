import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Controlled as CodeMirror } from "react-codemirror2";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getDataStudents } from '../redux/action/getDataStudents'
import { firebaseApp } from "./Firebase";
import "../css/TableOfStudentsTest.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/cmake/cmake";
import "codemirror/theme/material.css";

var codeHistory, fullName, number;

const codeMirrorOptions = {
  theme: "material",
  lineNumbers: true,
};

const decode = (bytes) => {
  var escaped = escape(atob(bytes || ""));
  try {
    return decodeURIComponent(escaped);
  } catch {
    return unescape(escaped);
  }
};

const getDate = (number) => {
  var day
  firebaseApp
    .database()
    .ref("Homework/Test/Homework"+number+"/Deadline")
    .on("value", function (snapshot) {
      if (snapshot.exists) {
          day = snapshot.val();
      }
    });
  return day;
};

const TableOfStudents = (props) => {

  number = localStorage.getItem("homeworkKey")

  const [count, setCount] = useState(
    0 + "ngày " + 0 + "giờ " + 0 + "phút " + 0 + "giây "
  );

  var x = setInterval(function () {
      var countDownDate = getDate(number);
      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element
      setCount(
        days + "ngày " + hours + "giờ " + minutes + "phút " + seconds + "giây "
      );
      // console.log(time)

      // If the count down is finished, write some text
      if (distance < 0) {
        setCount(0 + "ngày " + 0 + "giờ " + 0 + "phút " + 0 + "giây ");
      }
  }, 1000);

  const [rend, setRend] = useState(
    0 + "ngày " + 0 + "giờ " + 0 + "phút " + 0 + "giây "
  );

  var y = setInterval(function () {
      var countDownDate = new Date("Jan 5, 2030 15:37:25").getTime();
      // Get today's date and time
      var now = new Date().getTime();
      // Find the distance between now and the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element
      setRend(
        days + "ngày " + hours + "giờ " + minutes + "phút " + seconds + "giây "
      );
      // console.log(time)

      // If the count down is finished, write some text
  }, 1000);

  const [modal, setModal] = useState(false);

  const show = (history, Name) => {
    if (history !== null) codeHistory = decode(history)
    if (fullName !== null) fullName = Name
      setModal(!modal);
  };

  const hidden = () => {
    setModal(!modal);
  }
  
  const dispatch = useDispatch()
  const { dataStudents } = useSelector(state => state.userReducer)

  useEffect(()=>{
    dispatch(getDataStudents(number))
  },[])

  const editMark = (Number) => {
    document.getElementById("EditButton"+Number).style.display="none";
    document.getElementById("SaveButton"+Number).style.display="block";
    var mark = document.getElementById("Mark_row"+Number);

    var mark_data = mark.innerHTML;
    mark.innerHTML="<input type='number' id='mark_number"+Number+"' value='"+mark_data+"'>";
  }

  const setMark = (Number, ID) => {
    var mark_val = document.getElementById("mark_number"+Number).value;
    document.getElementById("Mark_row"+Number).innerHTML=mark_val;
   firebaseApp.database().ref("Homework(Test)/Test/Homework"+localStorage.getItem("homeworkKey")+"/HistoryCode/"+ID).update({
      Mark: mark_val
    });
    dispatch(getDataStudents(number))
    document.getElementById("EditButton"+Number).style.display="block";
    document.getElementById("SaveButton"+Number).style.display="none";
  }

  return (
    <div className="tableOfStudentsTest">
          <p hidden>{rend}</p>
          <h3 style={{ color: "red" , textAlign: "center"}}>{count}</h3>
      <Table hove id="tableOfStudent"r>
        <thead>
          <tr>
            <th>#</th>
            <th>Họ và tên</th>
            <th>Mã số sinh viên</th>
            <th>Thời gian nộp</th>
            <th>Điểm</th>
            <th>Code nộp</th>
            <th>Cho điểm</th>
          </tr>
        </thead>
        <tbody id ="bodyTable">
          {dataStudents.map(item => (
            <tr style={{ color: item.Color }} >
                <th scope="row">{item.Number}</th>
                <td>{item.FullName}</td>
                <td>{item.StudentID}</td>
                <td>{item.Time}</td>
                <td id={"Mark_row"+item.Number}>{item.Mark}</td>
            <td>
                <Button color="info" onClick={()=>show(item.CodeHistory, item.FullName)}>Lịch sử</Button>
            </td>
            <td>
                <Button color="danger" id={"EditButton"+item.Number} onClick={()=>editMark(item.Number)}>Sửa điểm</Button>
                <Button style ={{display: "none"}} color="info" id={"SaveButton"+item.Number} onClick={()=>setMark(item.Number, item.ID)}>Xác nhận</Button>
            </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={hidden} className="modalHistory">
          <ModalHeader toggle={hidden}>{fullName}</ModalHeader>
          <ModalBody>
            <CodeMirror
              id="codeHistory"
              value={codeHistory}
              options={{
                mode: "cmake",
                ...codeMirrorOptions,
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={hidden}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
    </div>
  );
}

export default TableOfStudents;
import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import "../css/TableOfStudents.css";
import { useDispatch, useSelector } from "react-redux";
import { Controlled as CodeMirror } from "react-codemirror2";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getDataStudents } from "../redux/action/getDataStudents";
import { firebaseApp } from "./Firebase";
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike"
import "codemirror/theme/material.css";

var codeHistory, fullName, number;

var countDown, Past;

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

const getCurrentTime = () => {
  axios
    .request({
      url:"http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh",
      method: "GET",
      async: true,
    })
    .then((result) => {
      countDown = result.data.unixtime * 1000;
    });
};

const getDate = (number) => {
  var day;
  firebaseApp
    .database()
    .ref("Homework/Test/Homework" + number + "/Deadline")
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        day = snapshot.val();
      }
    });
  return day;
};

const setStop = (stop, number) => {
  firebaseApp
    .database()
    .ref("Homework/Test/Homework" + number)
    .update({
      Stop: stop,
    });
};

const getStop = (number) => {
  var stop;
  firebaseApp
    .database()
    .ref("Homework/Test/Homework" + number + "/Stop")
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        stop = snapshot.val();
      }
    });
  return stop;
};

const TableOfStudents = (props) => {
  number = localStorage.getItem("homeworkKey");
  
  const [activeTab, setActiveTab] = useState("0");
  
  if (activeTab !== number) {
    getCurrentTime();
    setActiveTab(number);
  }

  const [modal, setModal] = useState(false);

  const show = (history, Name) => {
    setModal(true);
    if (history !== null && history !== codeHistory)
      codeHistory = decode(history);
    if (Name !== null && Name !== fullName) fullName = Name;
  };

  const hidden = () => {
    setModal(false);
  };

  const dispatch = useDispatch();
  const { dataStudents } = useSelector((state) => state.userReducer);

  const editMark = (Number) => {
    document.getElementById("EditButton" + Number).style.display = "none";
    document.getElementById("SaveButton" + Number).style.display = "block";
    var mark = document.getElementById("Mark_row" + Number);

    var mark_data = mark.innerHTML;
    mark.innerHTML =
      "<input type='number' max='10' min='0' id='mark_number" +
      Number +
      "' value='" +
      mark_data +
      "'>";
  };

  const setMark = (Number, ID) => {
    var mark_val = document.getElementById("mark_number" + Number).value;
    if (mark_val > 10 || mark_val < 0) mark_val = "Điểm không hợp lệ"
    else if (mark_val === null || mark_val==='') mark_val ="Vui lòng nhập điểm"
    document.getElementById("Mark_row" + Number).innerHTML = mark_val;
    firebaseApp
      .database()
      .ref(
        "Homework/Test/Homework" +
          localStorage.getItem("homeworkKey") +
          "/HistoryCode/" +
          ID
      )
      .update({
        Mark: mark_val,
      });
    dispatch(getDataStudents(number));
    document.getElementById("EditButton" + Number).style.display = "block";
    document.getElementById("SaveButton" + Number).style.display = "none";
  };

  return (
    <div className="tableOfStudents">
      <Table hove id="tableOfStudent" r>
        <thead>
          <tr>
            <th>#</th>
            <th>Họ và tên</th>
            <th>Mã số sinh viên</th>
            <th>Thời gian nộp</th>
            <th>Thời gian code chạy</th>
            <th>Điểm</th>
            <th>Code nộp</th>
            <th>Chấm điểm</th>
          </tr>
        </thead>
        <tbody id="bodyTable">
          {dataStudents.map((item) => (
            <tr style={{ color: item.Color }}>
              <th scope="row">{item.Number}</th>
              <td>{item.FullName}</td>
              <td>{item.StudentID}</td>
              <td>{item.Time}</td>
              <td>{item.TimeRunCode}</td>
              <td id={"Mark_row" + item.Number}>{item.Mark}</td>
              <td>
                <Button
                  color="info"
                  onClick={() => show(item.CodeHistory, item.FullName)}
                >
                  Xem
                </Button>
              </td>
              <td>
                <Button
                  color="danger"
                  id={"EditButton" + item.Number}
                  onClick={() => editMark(item.Number)}
                >
                  Sửa điểm
                </Button>
                <Button
                  style={{ display: "none" }}
                  color="info"
                  id={"SaveButton" + item.Number}
                  onClick={() => setMark(item.Number, item.ID)}
                >
                  Xác nhận
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <Modal isOpen={modal} toggle={hidden} className="modalHistory">
        <ModalHeader toggle={hidden}>{fullName}</ModalHeader>
        <ModalBody>
          <CodeMirror
            id="codeHistory"
            value={codeHistory}
            options={{
              mode: "text/x-csrc",
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
      </Table>   
    </div>
  );
};

export default TableOfStudents;

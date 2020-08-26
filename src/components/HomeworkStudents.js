import React, { useState, useEffect } from "react";
import "../css/CheckCode.css";
import { Controlled as CodeMirror } from "react-codemirror2";
import { firebaseApp } from "./Firebase";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike"
import "codemirror/theme/material.css";
import { getTestcaseHomework } from "../redux/action/getDataHomework";
import { useDispatch, useSelector } from "react-redux";

const data = {
  source_code: "",
  language_id: 54,
  stdin: "",
};

var Title, Introduct;

var Step

var Right = 0;

var testNumber;

var cSource =
  "\
#include <stdio.h>\n\
\n\
int main() {\n\
\n\
    return 0;\n\
}\n\
";

var codeHistory;

var time;

var Input1, Output1;

const decode = (bytes) => {
  var escaped = escape(atob(bytes || ""));
  try {
    return decodeURIComponent(escaped);
  } catch {
    return unescape(escaped);
  }
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

const getInform = (Number) => {
  firebaseApp
    .database()
    .ref("Homework/Test/Homework" + Number + "/Title")
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        Title = snapshot.val();
      }
    });
  firebaseApp
    .database()
    .ref("Homework/Test/Homework" + Number + "/Introduct")
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        Introduct = snapshot.val();
      }
    });
  firebaseApp
    .database()
    .ref("Homework/Test/Homework" + Number + "/Step_Test")
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        Step = parseInt(snapshot.val());
      }
    });
};

const saveCode = (code) => {
  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  var userInform = JSON.parse(localStorage.getItem("user"));
  firebaseApp
    .database()
    .ref(
      "Homework/Test/Homework" +
        localStorage.getItem("homeworkKey") +
        "/HistoryCode/" +
        localStorage.getItem("emailID")
    )
    .set({
      History: code,
      Time: dateTime,
      FullName: userInform.fullName,
      StudentID: userInform.studentID,
      Mark: "Chưa chấm điểm",
    });
};

const getExample = (Number) => {
  firebaseApp
    .database()
    .ref("Homework/Test/Homework" + Number)
    .child("Expected_Output/Expect1/Input")
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        Input1 = decode(snapshot.val());
      } else {
        Input1 = "";
      }
    });
  firebaseApp
    .database()
    .ref("Homework/Test/Homework" + Number)
    .child("Expected_Output/Expect1/Output")
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        Output1 = decode(snapshot.val());
      }
    });
};

const getHistory = () => {
  firebaseApp
    .database()
    .ref(
      "Homework/Test/Homework" +
        localStorage.getItem("homeworkKey") +
        "/HistoryCode/" +
        localStorage.getItem("emailID") +
        "/History"
    )
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        codeHistory = decode(snapshot.val());
      }
    });
  firebaseApp
    .database()
    .ref(
      "Homework/Test/Homework" +
        localStorage.getItem("homeworkKey") +
        "/HistoryCode/" +
        localStorage.getItem("emailID") +
        "/Time"
    )
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        time = snapshot.val();
      }
    });
};

const setRight = (Right, Time) => {
  firebaseApp
    .database()
    .ref(
      "Homework/Test/Homework" +
        localStorage.getItem("homeworkKey") +
        "/HistoryCode/" +
        localStorage.getItem("emailID")
    )
    .update({
      isRight: Right,
    });
  if (Right === true) {
    firebaseApp
      .database()
      .ref(
        "Homework/Test/Homework" +
          localStorage.getItem("homeworkKey") +
          "/HistoryCode/" +
          localStorage.getItem("emailID")
      )
      .update({
        TimeRunCode: Time,
      });
  }
};

export const HomeworkStudents = (props) => {

  testNumber = localStorage.getItem("homeworkKey");

  const [close, setClose] = useState(false)

  const [source, setSource] = useState();

  const [activeTab, setActiveTab] = useState("0");
  
  const dispatch = useDispatch();

  if (activeTab !== testNumber) {
    dispatch(getTestcaseHomework(testNumber))
    setActiveTab(testNumber);
    getHistory();
    getInform(testNumber);
    getExample(testNumber);
    setClose(!close)
    setSource(cSource);
  }

  const { testcaseHomework } = useSelector((state) => state.userReducer); 

  const clear = () => {
    setSource(cSource);
    document.getElementById("output").hidden = true;
  };

  const codeMirrorOptions = {
    theme: "material",
    lineNumbers: true,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  const getCode = (token, step) => {
    axios
      .request({
        url:"https://judge0.p.rapidapi.com/submissions/"+token,
        method: "GET",
        async: true,
        headers:{
          "content-type":"application/octet-stream",
          "x-rapidapi-host":"judge0.p.rapidapi.com",
          "x-rapidapi-key":"d91c2aed13msh035902c0588fa98p11a2b6jsnf3929baa4508",
          "useQueryString":true
          },
        params:{
          "fields":"*",
          "base64_encoded":"true"
          }
      })
      .then((result) => {
        // console.log(result.data);
        if (result.data.status.id <= 2) {
          setTimeout(getCode.bind(null, result.data.token, step));
        } else if (result.data.status.id === 3) {
          Right = Right + 1;
          // console.log(step + " " + Step + " " + Right);
          if (Right === Step) {
            setRight(true, result.data.time);
            document.getElementById("output").value = "Chính xác";
            document.getElementById("output").hidden = true;
            Swal.fire("Chính xác", "", "success");
          } else {
            setRight(false);
          }
        } else if (result.data.status.id === 4) {
          setRight(false);
          document.getElementById("output").value =
            result.data.status.description;
          document.getElementById("output").hidden = false;
        } else {
          document.getElementById("output").value = decode(result.data.compile_output)

          document.getElementById("output").hidden = false;
          setRight(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendCode = (dataCode, step) => {
    axios
      .request({
        method:"POST",
        url:"https://judge0.p.rapidapi.com/submissions",
        headers:{
        "content-type":"application/json",
        "x-rapidapi-host":"judge0.p.rapidapi.com",
        "x-rapidapi-key":"d91c2aed13msh035902c0588fa98p11a2b6jsnf3929baa4508",
        "accept":"application/json",
        "useQueryString":true
        },
        data: dataCode,
      })
      .then((result) => {
        getCode(result.data.token, step);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkCode = () => {
    data.source_code = source;
    var code = btoa(unescape(encodeURIComponent(data.source_code || "")));
    saveCode(code);
    for (var i = 1; i <= Step; i++) {
      var dataSubmit = {
        source_code: data.source_code,
        language_id: 54,
        stdin: (decode(testcaseHomework[i-1].Input) || ""),
        expected_output: decode(testcaseHomework[i-1].Output),
      };
      sendCode(dataSubmit, i);
    }
    Right = 0;
  };
  return (
    <div>
      <p hidden>{close}</p>
      {getStop(testNumber) === 1 ? (
        <div className="Checkcode">
          <div class="checkCodeTitle">
            <div className="homeWork">
              <h3>{Title}</h3>
              <p>
                <strong>Đề bài: </strong>
                {Introduct}
              </p>
              <p>
                <strong>Đầu vào: </strong>
              </p>
              <div className="Output1">
              <textarea rows="3" value={Input1} />
              </div>
              <p>
                <strong>Đầu ra: </strong>
              </p>
            </div>
          </div>
          <div className="Output1">
            <textarea rows="5" value={Output1} />
          </div>
          <div className="checkCodeApi">
            <h6>Nhập code của bạn</h6>
            <CodeMirror
              id="source_code"
              value={source}
              options={{
                mode: "text/x-csrc",
                ...codeMirrorOptions,
                value: cSource,
              }}
              onBeforeChange={(editor, data, source) => {
                setSource(source);
              }}
            />
            <textarea
              class="form-control"
              id="output"
              name="output"
              rows="2"
              cols="50"
              hidden
            ></textarea>
          </div>
          <Button id="check" type="submit" color="primary" onClick={checkCode}>
            Chấm code
          </Button>
          <Button id="history" color="info" onClick={toggle}>
            Lịch sử
          </Button>
          <Button id="clear" color="danger" onClick={() => clear()}>
            Xoá code
          </Button>
          <div>
            <Modal isOpen={modal} toggle={toggle} className="modalHistory">
              <ModalHeader toggle={toggle}>{time}</ModalHeader>
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
                <Button color="primary" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      ) : (
            null
      )}
    </div>
  );
};

export default HomeworkStudents;

import React, { useState, useEffect } from "react";
import "../css/CheckCode.css";
import { Controlled as CodeMirror } from "react-codemirror2";
import { firebaseApp } from "./Firebase";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
} from "reactstrap";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/cmake/cmake";
import "codemirror/theme/material.css";

var defaultUrl = "https://api.judge0.com";
var apiUrl = defaultUrl;

const data = {
  source_code: "",
  language_id: 54,
  stdin: "",
};

var load = 1;

var Title, Introduct;

var Step,
  Input = "",
  Output = "";

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

var Mark;

var Input1, Output1;

var countDown, Past;

const decode = (bytes) => {
  var escaped = escape(atob(bytes || ""));
  try {
    return decodeURIComponent(escaped);
  } catch {
    return unescape(escaped);
  }
};

const getCurrentTime = () =>{
  axios
  .request({
    url: "http://api.timezonedb.com/?zone=Asia/Ho_Chi_Minh&format=json&key=3JK6Y5WSRG2O",
    method: "GET",
    async: true,
  })
  .then((result) => {
    countDown = (result.data.timestamp * 1000) - 25200000
  })
}

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
  
  const setStop = (stop, number) => {
    firebaseApp.database().ref("Homework/Test/Homework"+number).update({
      Stop: stop,
    });
  };

  const getStop = (number) => {
    var stop
    firebaseApp
      .database()
      .ref("Homework/Test/Homework"+number+"/Stop")
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
      "/HistoryCode/"+
      localStorage.getItem("emailID") 

    )
    .set({
      History: code,
      Time: dateTime,
      FullName: userInform.fullName,
      StudentID: userInform.studentID,
      Mark: "Chưa chấm điểm"
    });
};

const getTestInform = (Number, Step) => {
  firebaseApp
    .database()
    .ref("Homework/Test/Homework" + Number)
    .child("Expected_Output/Expect" + Step + "/Input")
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        Input = snapshot.val();
      }
    });
  firebaseApp
    .database()
    .ref("Homework/Test/Homework" + Number)
    .child("Expected_Output/Expect" + Step + "/Output")
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        Output = snapshot.val();
      }
    });
};

const getExample = (Number) => {
  firebaseApp
  .database()
  .ref("Homework/Test/Homework" + Number)
  .child("Expected_Output/Expect1/Input")
  .on("value", function (snapshot) {
    if (snapshot.exists) {
      Input1 = snapshot.val();
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
}

const getHistory = () => {
  firebaseApp
    .database()
    .ref(
      "Homework/Test/Homework" +
      localStorage.getItem("homeworkKey") +
      "/HistoryCode/"+
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
      "/HistoryCode/"+
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
      "/HistoryCode/"+
        localStorage.getItem("emailID")
    )
    .update({
      isRight: Right,
    });
  if(Right === true) {
    firebaseApp
    .database()
    .ref(
      "Homework/Test/Homework" +
      localStorage.getItem("homeworkKey") +
      "/HistoryCode/"+
        localStorage.getItem("emailID")
    )
    .update({
      TimeRunCode: Time
    });
  }
};

export const HomeworkStudents = (props) => {

  useEffect(()=>{
    getCurrentTime()
    Past = new Date().getTime()
}, [])

    testNumber = localStorage.getItem("homeworkKey");


  const [count, setCount] = useState(
    0 + "ngày " + 0 + "giờ " + 0 + "phút " + 0 + "giây "
  );

  var x = setInterval(function () {
    if (getStop(testNumber) === 1) {
      var countDownDate = getDate(testNumber);
      // Get today's date and time
      var TimeNow = new Date().getTime()
      var Change = TimeNow -  Past;
      // console.log(Change)
      var now = countDown;
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
      if(Change > 1000) {
        countDown = countDown + 1000
        Past = new Date().getTime()
      }
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
        setStop(2, testNumber);
        setCount(0 + "ngày " + 0 + "giờ " + 0 + "phút " + 0 + "giây ");
      }
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

  const clear = () => {
    setSource(cSource);
    document.getElementById("output").hidden = true;
  };

  const [source, setSource] = useState();

  const codeMirrorOptions = {
    theme: "material",
    lineNumbers: true,
  };

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  getHistory();
  getInform(testNumber);
  getTestInform(testNumber, 1);
  getExample(testNumber)

  const getCode = (token, step) => {
    axios
      .request({
        url: apiUrl + "/submissions/" + token + "?base64_encoded=true",
        method: "GET",
        async: true,
      })
      .then((result) => {
        // console.log(result.data);
        if (result.data.status.id <= 2) {
          // document.getElementById('output').value = result.data.status.description
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
          document.getElementById("output").value =
            result.data.status.description;
          document.getElementById("output").hidden = false;
          setRight(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendCode = (dataCode, step) => {
    localStorage.setItem("state", step);
    // console.log(Right+" "+step)
    axios
      .request({
        url: apiUrl + `/submissions?base64_encoded=true&wait=false`,
        method: "POST",
        async: true,
        contentType: "application/json",
        data: dataCode,
      })
      .then((result) => {
        // console.log(result.data);
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
    // console.log("ngôn ngữ:"+data.language_id +'\n'+"souce_code:"+code)
    for (var i = 1; i <= Step; i++) {
      getTestInform(testNumber, i);
      // console.log(testNumber + " " + i);
      // console.log(Input + " Output:" + Output);
      var dataSubmit = {
        source_code: code,
        language_id: 54,
        stdin: btoa(unescape(encodeURIComponent(Input || ""))),
        expected_output: Output,
      };
      // console.log(dataSubmit);
      sendCode(dataSubmit, i);
    }
    Right = 0;
  };
  return (
    <div>
    <p hidden>{rend}</p>
    {getStop(testNumber) === 1? (
    <div className="Checkcode">
      <div class="checkCodeTitle">
        <div className="homeWork">
        <h3 style={{ color: "red", textAlign:"center" }}>{count}</h3>
          <h3>{Title}</h3>
          <p><strong>Đề bài: </strong>{Introduct}</p>
          <p><strong>Input: </strong>{Input1}</p>
          <p><strong>Output: </strong></p>
        </div>
      </div>
      <div className ="Output1">  
         <textarea rows="5" value={Output1}/>
      </div>
      <div className="checkCodeApi">
        <h6>Nhập code của bạn</h6>
        <CodeMirror
          id="source_code"
          value={source}
          options={{
            mode: "cmake",
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
                mode: "cmake",
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
        <div class="checkCodeTitle">
        <div className="homeWork">
            <h3 >Thời gian làm bài đã hết</h3>
        </div>
        </div>
      )} 
    </div>
  );
};

export default HomeworkStudents;

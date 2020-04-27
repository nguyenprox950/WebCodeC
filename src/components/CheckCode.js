import React, { useState } from "react";
import "../css/CheckCode.css";
import { Controlled as CodeMirror } from "react-codemirror2";
import { firebaseApp } from "../components/Firebase";
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

var max;

const decode = (bytes) => {
  var escaped = escape(atob(bytes || ""));
  try {
    return decodeURIComponent(escaped);
  } catch {
    return unescape(escaped);
  }
};

const getInform = (Number) => {
  firebaseApp
    .database()
    .ref("Test/Test" + Number + "/Title")
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        Title = snapshot.val();
      }
    });
  firebaseApp
    .database()
    .ref("Test/Test" + Number + "/Introduct")
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        Introduct = snapshot.val();
      }
    });
  firebaseApp
    .database()
    .ref("Test/Test" + Number + "/Step_test")
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        Step = parseInt(snapshot.val());
      }
    });
  max = Step;
};

const saveCode = (code) => {
  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  firebaseApp
    .database()
    .ref(
      "historyCode/" +
        localStorage.getItem("emailID") +
        "/Test" +
        localStorage.getItem("testKey")
    )
    .set({
      history: code,
      time: dateTime,
    });
};

const getTestInform = (Number, Step) => {
  // console.log(Input + " " + Output);
  firebaseApp
    .database()
    .ref("Test/Test" + Number)
    .child("Expected_Output/Expect" + Step + "/Input")
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        Input = snapshot.val();
      }
    });
  firebaseApp
    .database()
    .ref("Test/Test" + Number)
    .child("Expected_Output/Expect" + Step + "/Output")
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        Output = snapshot.val();
      }
    });
};

const getHistory = () => {
  firebaseApp
    .database()
    .ref(
      "historyCode/" +
        localStorage.getItem("emailID") +
        "/Test" +
        localStorage.getItem("testKey") +
        "/history"
    )
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        codeHistory = decode(snapshot.val());
      }
    });
  firebaseApp
    .database()
    .ref(
      "historyCode/" +
        localStorage.getItem("emailID") +
        "/Test" +
        localStorage.getItem("testKey") +
        "/time"
    )
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        time = snapshot.val();
      }
    });
};

const setRight = (Right) => {
  firebaseApp
    .database()
    .ref(
      "historyCode/" +
        localStorage.getItem("emailID") +
        "/Test" +
        localStorage.getItem("testKey") +
        "/Right"
    )
    .set({
      isRight: Right,
    });
};

export const CheckCode = (props) => {
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

  testNumber = localStorage.getItem("testKey");
  getInform(testNumber);
  getTestInform(testNumber, 1);

  const getCode = (token, step) => {
    axios
      .request({
        url: apiUrl + "/submissions/" + token + "?base64_encoded=true",
        method: "GET",
        async: true,
      })
      .then((result) => {
        console.log(result.data);
        if (result.data.status.id <= 2) {
          // document.getElementById('output').value = result.data.status.description
          setTimeout(getCode.bind(null, result.data.token, step));
        } else if (result.data.status.id === 3) {
          Right = Right + 1;
          console.log(step + " " + Step + " " + Right);
          if (Right === Step) {
            setRight(true);
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
        console.log(result.data);
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
      console.log(testNumber + " " + i);
      console.log(Input + " Output:" + Output);
      var dataSubmit = {
        source_code: code,
        language_id: 54,
        stdin: btoa(unescape(encodeURIComponent(Input || ""))),
        expected_output: Output,
      };
      console.log(dataSubmit);
      sendCode(dataSubmit, i);
    }
    Right = 0;
  };
  return (
    <div className="checkCode">
      <div class="checkCodeTitle">
        <div className="homeWork">
          <h3>{Title}</h3>
        </div>
        <div className="require">
          <p>Đề bài:</p>
        </div>
        <div className="test">
          <p>{Introduct}</p>
        </div>
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
        {/* <div className="text-center">{min+"/"+max}</div>
            <Progress value={localStorage.getItem("state")} max={max} /> */}
      </div>
    </div>
  );
};

export default CheckCode;

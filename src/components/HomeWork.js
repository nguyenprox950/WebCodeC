import React, { useState } from "react";
import "../css/HomeWork.css";
import Swal from "sweetalert2";
import { Formik, Form } from "formik";
import { MyInput } from "./MyInput";
import { firebaseApp } from "../components/Firebase";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Controlled as CodeMirror } from "react-codemirror2";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import * as yup from "yup";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/cmake/cmake";
import "codemirror/theme/material.css";

var stop = 0;

var date;

const validationSchema = yup.object({
  title: yup.string().required("Vui lòng nhập tiêu đề"),

  introduct: yup.string().required("Vui lòng nhập yêu cầu"),

  deadLine: yup.date().required("Vui lòng nhập Deadline"),
});

const setDate = (deadLine) => {
  firebaseApp.database().ref("homeWork/deadLine").set({
    date: deadLine,
  });
};

const getDate = () => {
  firebaseApp
    .database()
    .ref("homeWork/deadLine/date")
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        date = snapshot.val();
      } else {
        date = new Date().getTime();
      }
    });
  return date;
};

const setStop = (stop) => {
  firebaseApp.database().ref("homeWork/Stop").set({
    stop: stop,
  });
};

const deleteHistory = () => {
  firebaseApp.database().ref("homeWork/CodeHistory(student)").remove();
};

const getStop = () => {
  firebaseApp
    .database()
    .ref("homeWork/Stop/stop")
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        stop = snapshot.val();
      }
    });
  return stop;
};

const setHomeWork = (values) => {
  var step = 1;
  if (values.output2 !== "") step = 2;

  if (values.output3 !== "") step = 3;

  if (values.output4 !== "") step = 4;

  if (values.output5 !== "") step = 5;

  firebaseApp.database().ref("homeWork/Test").set({
    Title: values.title,
    Introduct: values.introduct,
    Step_test: step,
  });

  firebaseApp.database().ref("homeWork/Test/Expected_Output/Expect1").set({
    Input: values.input1,
    Output: values.output1,
  });

  if (step > 1) {
    firebaseApp.database().ref("homeWork/Test/Expected_Output/Expect2").set({
      Input: values.input2,
      Output: values.output2,
    });
  }

  if (step > 2) {
    firebaseApp.database().ref("homeWork/Test/Expected_Output/Expect3").set({
      Input: values.input3,
      Output: values.output3,
    });
  }

  if (step > 3) {
    firebaseApp.database().ref("homeWork/Test/Expected_Output/Expect4").set({
      Input: values.input4,
      Output: values.output4,
    });
  }

  if (step > 4) {
    firebaseApp.database().ref("homeWork/Test/Expected_Output/Expect5").set({
      Input: values.input5,
      Output: values.output5,
    });
  }

  Swal.fire("Tạo bài tập thành công", "", "success");
};

const setHidden = (age, number) => {
  if(age === 1 && number === 1){
    return false
  } else if (age === 2 && number <= 2){
    return false
  } else if (age === 3 && number <= 3){
    return false
  } else if (age === 4 && number <= 4){
    return false
  } else if (age === 5 && number <= 5){
    return false
  } else {
    return true
  }
}

export const HomeWork = (props) => {

  const [source, setSource] = useState();

  const [modal, setModal] = useState(false);

  const [OP1, setOP1] = useState('');
  const [OP2, setOP2] = useState('');
  const [OP3, setOP3] = useState('');
  const [OP4, setOP4] = useState('');
  const [OP5, setOP5] = useState('');


  const setOutput = (number) => {
    number = parseInt(number)
    setModal(!modal);
    var code = btoa(unescape(encodeURIComponent(source || "")));
    if(number === 1)setOP1(code)
    else if (number === 2)setOP2(code)
    else if (number === 3)setOP3(code)
    else if (number === 4)setOP4(code)
    else if (number === 5)setOP5(code)
    setSource(null);
  };

  const igNore = () => {
    setModal(!modal);
    setSource(null);
  }

  const toggle = (number) => {
    if(number !== null) localStorage.setItem('Output', number)
    setModal(!modal);
  };


  const codeMirrorOptions = {
    theme: "material",
    lineNumbers: true,
  };

  const [age, setAge] = useState(1);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [time, setTime] = useState(
    0 + "ngày " + 0 + "giờ " + 0 + "phút " + 0 + "giây "
  );

  var x = setInterval(function () {
    if (getStop() === 1) {
      var countDownDate = new Date(getDate()).getTime();
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
      setTime(
        days + "ngày " + hours + "giờ " + minutes + "phút " + seconds + "giây "
      );
      // console.log(time)

      // If the count down is finished, write some text
      if (distance < 0) {
        setStop(2);
        setTime(0 + "ngày " + 0 + "giờ " + 0 + "phút " + 0 + "giây ");
      }
    }
  }, 1000);

  const handleSuccess = (values) => {
    values.output1 = document.getElementById("output1").value
    values.output2 = document.getElementById("output2").value
    values.output3 = document.getElementById("output3").value
    values.output4 = document.getElementById("output4").value
    values.output5 = document.getElementById("output5").value
    setDate(values.deadLine);
    setStop(1);
    setHomeWork(values);
    deleteHistory();
  };
  return (
    <div className="demo">
      <text style={{ color: "red" }}>{time}</text>
      <Formik
        initialValues={{
          title: "",
          introduct: "",
          input1: "",
          output1: "",
          input2: "",
          output2: "",
          input3: "",
          output3: "",
          input4: "",
          output4: "",
          input5: "",
          output5: "",
          deadLine: "",
        }}
        setFieldValue
        validationSchema={validationSchema}
        onSubmit={(values) => handleSuccess(values)}
      >
        {({ handelSubmit }) => (
          <div>
          <Form className="FormikHomeWork">
            <MyInput type="text" name="title" label="Tiêu đề" />
            <MyInput type="text" name="introduct" label="Yêu cầu" />
            <MyInput
              type="datetime-local"
              name="deadLine"
              label="Deadline"
              format="dd/MM/yyyy"
              InputLabelProps={{ shrink: true }}
            />
            <FormControl>
            <InputLabel id="demo-simple-select-label">Số lượng Testcase</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
            <MyInput hidden = {setHidden(age, 1)} type="text" name="input1" label="Input1" />
            <MyInput hidden = {setHidden(age, 1)} id="output1" value={OP1} onClick={()=>toggle(1)} type="text" name="output1" label="Output1" />
            <MyInput hidden = {setHidden(age, 2)} type="text" name="input2" label="Input2" />
            <MyInput hidden = {setHidden(age, 2)} id="output2" value={OP2} onClick={()=>toggle(2)} type="text" name="output2" label="Output2" />
            <MyInput hidden = {setHidden(age, 3)} type="text" name="input3" label="Input3" />
            <MyInput hidden = {setHidden(age, 3)} id="output3" value={OP3} onClick={()=>toggle(3)} type="text" name="output3" label="Output3" />
            <MyInput hidden = {setHidden(age, 4)} type="text" name="input4" label="Input4" />
            <MyInput hidden = {setHidden(age, 4)} id="output4" value={OP4} onClick={()=>toggle(4)} type="text" name="output4" label="Output4" />
            <MyInput hidden = {setHidden(age, 5)} type="text" name="input5" label="Input5" />
            <MyInput hidden = {setHidden(age, 5)} id="output5" value={OP5} onClick={()=>toggle(5)} type="text" name="output5" label="Output5" />
            <Button
              id="createHomeWork"
              color="primary"
              type="submit"
              name="createHomeWork"
              onClick={handelSubmit}
            >
              Tạo bài tập
            </Button>
          </Form>
          <Modal isOpen={modal} toggle={igNore} className="modalHistory">
            <ModalHeader toggle={igNore}>{"Output"+localStorage.getItem("Output")}</ModalHeader>
            <ModalBody>
              <CodeMirror
                id="source_code"
                value={source}
                options={{
                  mode: "cmake",
                  ...codeMirrorOptions
                }}
                onBeforeChange={(editor, data, source) => {
                  setSource(source);
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={()=>setOutput(localStorage.getItem('Output'))}>
                Chấp nhận
              </Button>
            </ModalFooter>
          </Modal>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default HomeWork;

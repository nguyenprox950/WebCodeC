import React, { useState } from "react";
import "../css/HomeWork.css";
import Translate from "./Translate";
import Swal from "sweetalert2";
import { Formik, Form } from "formik";
import { MyInput } from "./MyInput";
import { firebaseApp } from "../components/Firebase";
import { Button } from "reactstrap";
import * as yup from "yup";

var stop = 0;

var date;

const validationSchema = yup.object({
  title: yup.string().required("Vui lòng nhập tiêu đề"),

  introduct: yup.string().required("Vui lòng nhập yêu cầu"),

  deadLine: yup.date().required("Vui lòng nhập Deadline"),

  output1: yup.string().required("Vui lòng nhập Output1"),
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

  Swal.fire("Tạo bài tập thành công", "", "success");
};

export const HomeWork = () => {
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
    console.log(values.deadLine);
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
          deadLine: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSuccess(values)}
      >
        {({ handelSubmit }) => (
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
            <MyInput type="text" name="input1" label="Input1" />
            <MyInput type="text" name="output1" label="Output1" />
            <MyInput type="text" name="input2" label="Input2" />
            <MyInput type="text" name="output2" label="Output2" />
            <MyInput type="text" name="input3" label="Input3" />
            <MyInput type="text" name="output3" label="Output3" />
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
        )}
      </Formik>
    </div>
  );
};

export default HomeWork;

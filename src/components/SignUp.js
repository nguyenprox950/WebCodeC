import React from "react";
import { Formik, Form } from "formik";
import { MyInput } from "./MyInput";
import * as yup from "yup";
import "../css/SignUp.css";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/action/userAction";

const validationSchema = yup.object({
  fullName: yup
    .string()
    .required("Vui lòng nhập đầy đủ họ tên")
    .matches(/^([^0-9]*)$/, "Tên chỉ bao gồm ký tự từ a-z")
    .max(24, "Tên quá dài")
    .min(6, "Tên quá ngắn"),

  birthday: yup.date().required("Vui lòng nhập ngày sinh"),

  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),

  studentID: yup
    .string()
    .required("Vui lòng nhập mã số sinh viên")
    .matches(/^([^a-z]*)$/, "Mã số sinh viên chỉ gồm 7 số từ 0-9")
    .max(7, "Mã số sinh viên bao gồm 7 số")
    .min(7, "Mã số sinh viên bao gồm 7 số"),

  phoneNumber: yup
    .string()
    .required("Vui lòng nhập mã số điện thoại")
    .matches(/^([^a-z]*)$/, "Số điện thoại chỉ gồm 10 số từ 0-9")
    .max(10, "Số điện thoại bao gồm 10 số")
    .min(10, "Số điện thoại bao gồm 10 số"),

  password: yup
    .string()
    .min(6, "Mật khẩu quá ngắn")
    .required("Vui lòng nhập mật khẩu"),

  password2: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu không giống mật khẩu đã nhập")
    .required("Vui lòng nhập lại mật khẩu"),
});

const SignUp = (props) => {
  const dispatch = useDispatch();

  const handleSuccess = () => {
    props.history.push("/signin");
  };

  return (
    <div>
      <Formik
        initialValues={{
          fullName: "",
          birthday: "",
          email: "",
          studentID: "",
          phoneNumber: "",
          password: "",
          password2: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => dispatch(signUp(values, handleSuccess))}
      >
        {({ handelSubmit }) => (
          <div className="signUpBody">
            <title>Đăng kí</title>
            <div className="toSignUp">
              <div className="formSignUp">
                <h2>Đăng ký học</h2>
                <img src="../img/2.png" />
                <Form className="Formik">
                  <MyInput type="text" name="fullName" label="Họ và tên" />
                  <MyInput
                    type="date"
                    name="birthday"
                    label="Ngày sinh"
                    format="dd/MM/yyyy"
                    InputLabelProps={{ shrink: true }}
                  />
                  <MyInput type="email" name="email" id="email" label="Email" />
                  <MyInput
                    type="text"
                    name="studentID"
                    label="Mã số sinh viên"
                  />
                  <MyInput
                    type="text"
                    name="phoneNumber"
                    label="Số điện thoại"
                  />
                  <MyInput type="password" name="password" label="Mật khẩu" />
                  <MyInput
                    type="password"
                    name="password2"
                    label="Nhập lại mật khẩu"
                  />
                  <button
                    id="register1"
                    type="submit"
                    name="SignIn"
                    onClick={handelSubmit}
                  >
                    Đăng ký
                  </button>
                </Form>
                <button
                  id="register2"
                  name="Back"
                  onClick={() => props.history.push("/signin")}
                >
                  Trở lại
                </button>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;

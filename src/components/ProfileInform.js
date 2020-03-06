import React from "react";
import { Formik, Form } from "formik";
import { MyInput } from "./MyInput";
import { ButtonToggle } from "reactstrap";
import "../css/Profile.css";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { changeInform } from "../redux/action/userAction";

const ProfileInform = props => {
  const { userInform } = useSelector(state => state.userReducer);
  const dispatch = useDispatch()

  const validationSchema = yup.object({
    fullName: yup
      .string()
      .required("Vui lòng nhập đầy đủ họ tên")
      .matches(/^([^0-9]*)$/, "Tên chỉ bao gồm ký tự từ a-z")
      .max(30, "Tên quá dài")
      .min(5, "Tên quá ngắn"),

    birthday: yup.string().required("Vui lòng nhập ngày sinh"),

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
      .min(10, "Số điện thoại bao gồm 10 số")
  });

  const enableForm = () => {
    document.getElementById("fullName").disabled = false;
    document.getElementById("birthday").disabled = false;
    document.getElementById("studentID").disabled = false;
    document.getElementById("phoneNumber").disabled = false;
    document.getElementById("changeInform").hidden = true;
    document.getElementById("accept").hidden = false;
  };

  const handelSuccess = () => {
    document.getElementById("fullName").disabled = true;
    document.getElementById("birthday").disabled = true;
    document.getElementById("studentID").disabled = true;
    document.getElementById("phoneNumber").disabled = true;
    document.getElementById("changeInform").hidden = false;
    document.getElementById("accept").hidden = true;
  }

  return (
    <div className="Profile">
      <div id="rightProfile">
        <Formik
          const
          initialValues={{
            fullName: userInform.fullName,
            birthday: userInform.birthday,
            email: userInform.email,
            studentID: userInform.studentID,
            phoneNumber: userInform.phoneNumber,
            password: userInform.password
          }}
          validationSchema={validationSchema}
          onSubmit = {values => dispatch(changeInform(values, handelSuccess))} >
          {({ handelSubmit }) => (
            <div>
              <Form className="formikProfile">
                <p>Họ và Tên:</p>
                <MyInput
                  id="fullName"
                  type="text"
                  name="fullName"
                  variant="outlined"
                  disabled
                />
                <p>Ngày sinh:</p>
                <MyInput
                  id="birthday"
                  type="date"
                  name="birthday"
                  variant="outlined"
                  disabled
                />
                <p>Email:(Không thể thay đổi)</p>
                <MyInput
                  id="email"
                  type="email"
                  name="email"
                  variant="outlined"
                  disabled
                />
                <p>Mã số sinh viên:</p>
                <MyInput
                  id="studentID"
                  type="text"
                  name="studentID"
                  variant="outlined"
                  disabled
                />
                <p>Số điện thoại:</p>
                <MyInput
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  variant="outlined"
                  disabled
                />
                <p>Mật khẩu</p>
                <MyInput
                  id="password"
                  type="text"
                  name="password"
                  variant="outlined"
                />
                <ButtonToggle
                  id="accept"
                  color="primary"
                  onClick={handelSubmit}
                  hidden
                >
                  Xác nhận
                </ButtonToggle>
                <ButtonToggle
                  id="changeInform"
                  color="primary"
                  onClick={enableForm}
                >
                  Thay đổi thông tin
                </ButtonToggle>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfileInform;

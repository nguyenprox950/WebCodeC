import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { MyInput } from "./MyInput";
import { ButtonToggle } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../redux/action/changeInformUser";

const ProfileChangePassword = (props) => {
  const dispatch = useDispatch();

  const { userInform } = useSelector((state) => state.userReducer);

  const validationPassword = yup.object({
    password: yup
      .string()
      .min(6, "Mật khẩu quá ngắn")
      .required("Vui lòng nhập mật khẩu"),

    password2: yup
      .string()
      .oneOf([yup.ref("password")], "Mật khẩu không giống mật khẩu đã nhập")
      .required("Vui lòng nhập lại mật khẩu"),
  });

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
            password: "",
            password2: "",
          }}
          validationSchema={validationPassword}
          onSubmit={(values) => dispatch(changePassword(values))}
        >
          {({ handelSubmit }) => (
            <div>
              <Form className="formikProfile">
                <p hidden>Họ và Tên:</p>
                <MyInput
                  id="fullName"
                  type="text"
                  name="fullName"
                  variant="outlined"
                  hidden
                />
                <p hidden>Ngày sinh:</p>
                <MyInput
                  id="birthday"
                  type="date"
                  name="birthday"
                  variant="outlined"
                  hidden
                />
                <p hidden>Email:(Không thể thay đổi)</p>
                <MyInput
                  id="email"
                  type="email"
                  name="email"
                  variant="outlined"
                  hidden
                />
                <p hidden>Mã số sinh viên:</p>
                <MyInput
                  id="studentID"
                  type="text"
                  name="studentID"
                  variant="outlined"
                  hidden
                />
                <p hidden>Số điện thoại:</p>
                <MyInput
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  variant="outlined"
                  hidden
                />
                <p>Mật khẩu mới:</p>
                <MyInput
                  id="password"
                  type="text"
                  name="password"
                  variant="outlined"
                />
                <p>Xác nhận mật khẩu:</p>
                <MyInput
                  id="password2"
                  type="text"
                  name="password2"
                  variant="outlined"
                />
                <ButtonToggle
                  id="accept"
                  color="primary"
                  onClick={handelSubmit}
                >
                  Xác nhận
                </ButtonToggle>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfileChangePassword;

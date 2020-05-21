import React from "react";
import "antd/dist/antd.css";
import "../css/Profile.css";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileMenu = (props) => {

  const { userInform } = useSelector((state) => state.userReducer);
  
  return (
    <div className="Profile">
      <div id="leftProfile">
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <Menu.Item key="1">
            <Link to={`/profile/${userInform.email}/inform`}>Thông tin cơ bản</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={`/profile/${userInform.email}/changepassword`}>Đổi mật khẩu</Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default ProfileMenu;

// validationSchema = yup.object({
//   fullName:yup.string()
//   .required("Vui lòng nhập đầy đủ họ tên")
//   .matches(/^([^0-9]*)$/,"Tên chỉ bao gồm ký tự từ a-z")
//   .max(30,"Tên quá dài")
//   .min(5,"Tên quá ngắn"),

//   birthday:yup.string()
//   .required("Vui lòng nhập ngày sinh"),

//   email:yup.string()
//   .email('Email không hợp lệ')
//   .required("Vui lòng nhập email"),

//   studentID:yup.string()
//   .required('Vui lòng nhập mã số sinh viên')
//   .matches(/^([^a-z]*)$/,"Mã số sinh viên chỉ gồm 7 số từ 0-9")
//   .max(7,"Mã số sinh viên bao gồm 7 số")
//   .min(7,"Mã số sinh viên bao gồm 7 số"),

//   phoneNumber:yup.string()
//   .required('Vui lòng nhập mã số điện thoại')
//   .matches(/^([^a-z]*)$/,"Số điện thoại chỉ gồm 10 số từ 0-9")
//   .max(10,"Số điện thoại bao gồm 10 số")
//   .min(10,"Số điện thoại bao gồm 10 số")
// })

// validationPassword = yup.object({
//   password:yup.string()
//   .min(6,"Mật khẩu quá ngắn")
//   .required('Vui lòng nhập mật khẩu'),

//   password2:yup.string()
//   .oneOf([yup.ref('password')], 'Mật khẩu không giống mật khẩu đã nhập')
//   .required('Vui lòng nhập lại mật khẩu'),
// })

// enableForm = () => {
//   document.getElementById("fullName").disabled = false;
//   document.getElementById("birthday").disabled = false;
//   document.getElementById("studentID").disabled = false;
//   document.getElementById("phoneNumber").disabled = false;
//   document.getElementById("changeInform").hidden = true;
//   document.getElementById("accept").hidden = false;
// }

//   setData = () =>{
//     firebaseApp.database().ref('userInform/' + localStorage.getItem('login')).child('fullName').on('value', function(snapshot) {
//     })
//   }

//   handleSuccess = (values) => {
//     document.getElementById("fullName").disabled = true;
//     document.getElementById("birthday").disabled = true;
//     document.getElementById("studentID").disabled = true;
//     document.getElementById("phoneNumber").disabled = true;
//     document.getElementById("changeInform").hidden = false;
//     document.getElementById("accept").hidden = true;

//     console.log(localStorage.getItem('login'))

//     firebaseApp.database().ref('userInform/' + localStorage.getItem('login')).set ({
//       fullName : values.fullName,
//       birthday: values.birthday,
//       email: values.email,
//       studentID: values.studentID,
//       phoneNumber: values.phoneNumber,
//       password : this.state.password
//     })
//   }

//   handelChangePassword = (values) => {
//     var user = firebaseApp.auth().currentUser;
//     user.updatePassword(values.password).then(function() {
//       Swal.fire(
//         'Chúc mừng!',
//         'Bạn đã thay đổi mật khẩu thành công!',
//         'success'
//       )
//     }).catch(function(error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Thất bại',
//         text: 'Không thay đổi được mật khẩu!',
//     })
//     });
//   }

//   componentDidMount () {
//     this.setData();
//   }

//   render() {
//     let rightProfile;
//     if (this.state.userShow) {
//         rightProfile = [
//           <Formik
//             const initialValues = {
//                 {
//                     fullName: this.state.fullName,
//                     birthday: this.state.birthday,
//                     email: this.state.email,
//                     studentID: this.state.studentID,
//                     phoneNumber: this.state.phoneNumber,
//                 }
//             }
//             validationSchema = { this.validationSchema }
//             onSubmit = {values => this.handleSuccess(values)}>
//             {({ handelSubmit }) =>
//               <div>
//                 <Form className = "formikProfile">
//                   <p>Họ và Tên:</p>
//                   <MyInput id="fullName" type = "text" name= "fullName" variant="outlined" disabled/>
//                   <p>Ngày sinh:</p>
//                   <MyInput id="birthday" type = "date" name= "birthday" variant="outlined" disabled/>
//                   <p>Email:(Không thể thay đổi)</p>
//                   <MyInput id="email" type = "email" name= "email" variant="outlined" />
//                   <p>Mã số sinh viên:</p>
//                   <MyInput id="studentID" type = "text" name= "studentID" variant="outlined" disabled/>
//                   <p>Số điện thoại:</p>
//                   <MyInput id="phoneNumber" type = "text" name= "phoneNumber" variant="outlined" disabled/>
//                   <ButtonToggle id="accept" color="primary" onClick={handelSubmit} hidden>Xác nhận</ButtonToggle>
//                   <ButtonToggle id="changeInform" color="primary" onClick={this.enableForm} >Thay đổi thông tin</ButtonToggle>
//                 </Form>
//               </div>
//             }
//           </Formik>
//         ]
//     }
//     else if (this.state.changePassword) {
//       rightProfile = [
//         <Formik
//           const newPassword = {
//               {
//                   password: '',
//                   password2: '',
//               }
//           }
//           validationSchema = { this.validationPassword }
//           onSubmit = {values => this.handelChangePassword(values)}>
//           {({ handelSubmit }) =>
//             <div>
//               <Form className = "formikProfile">
//                 <p>Mật khẩu mới:</p>
//                 <MyInput id="password" type = "text" name= "password" variant="outlined"/>
//                 <p>Xác nhận mật khẩu:</p>
//                 <MyInput id="password2" type = "text" name= "password2" variant="outlined"/>
//                 <ButtonToggle id="accept" color="primary" onClick={handelSubmit}>Xác nhận</ButtonToggle>
//               </Form>
//             </div>
//           }
//         </Formik>
//       ]
//     }

//     );
//   }
// }

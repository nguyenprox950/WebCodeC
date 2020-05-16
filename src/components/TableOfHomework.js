import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { firebaseApp } from "./Firebase";
import { getHomeworkInform } from '../redux/action/getDataHomework'

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

const TableOfStudents = (props) => {

  const [modal, setModal] = useState(false);

  const show = (history, Name) => {
      setModal(true);
  };

  const hidden = () => {
    setModal(false);
  }

  const dispatch = useDispatch()
  const { homeworkInform } = useSelector(state => state.userReducer)
  useEffect(()=>{
    dispatch(getHomeworkInform())
  },[])


  const editHomework = (Number) => {
    document.getElementById("EditButton"+Number).style.display="none";
    document.getElementById("SaveButton"+Number).style.display="block";
    var title = document.getElementById("Title_Row"+Number);
    var introduct = document.getElementById("Introduct_Row"+Number);

    var title_data = title.innerHTML;
    var introduct_data = introduct.innerHTML;
    title.innerHTML="<input type='text' id='title_number"+Number+"' value='"+title_data+"'>";
    introduct.innerHTML="<input type='text' id='introduct_number"+Number+"' value='"+introduct_data+"'>";
  }

  const setHomework = (Number, ID) => {
    var Title_Val = document.getElementById("title_number"+Number).value;
    var Introduct_Val = document.getElementById("introduct_number"+Number).value;
  //   if (mark_val > 10|| mark_val < 0) mark_val="Điểm không hợp lệ"
    document.getElementById("Title_Row"+Number).innerHTML=Title_Val;
    document.getElementById("Introduct_Row"+Number).innerHTML=Introduct_Val;
  //  firebaseApp.database().ref("Homework/Test/Homework"+localStorage.getItem("homeworkKey")+"/HistoryCode/"+ID).update({
  //     Mark: mark_val
  //   });
  //   dispatch(getDataStudents(number))
    document.getElementById("EditButton"+Number).style.display="block";
    document.getElementById("SaveButton"+Number).style.display="none";
  }
  

  return (
    <div className="tableOfHomework" style={{paddingTop: "60px"}}>
      <Table hover >
        <thead>
          <tr>
            <th>#</th>
            <th>Tên bài</th>
            <th>Miêu tả</th>
            <th>Deadline</th>
            <th>Số sinh viên đã nộp bài</th>
            <th>Chỉnh sửa</th>
          </tr>
        </thead>
        <tbody id ="bodyTable">
        {homeworkInform.map(item => (
            <tr style={{ color: item.Color }} >
                <th scope="row">{item.Number}</th>
                <td id={"Title_Row"+item.Number}>{item.Title}</td>
                <td id={"Introduct_Row"+item.Number} style={{maxWidth: "150px"}}>{item.Introduct}</td>
                <td>{item.Deadline_Day}</td>
                <td>{item.NumberOfStudents}</td>
                <td>
                <Button color="danger" id={"EditButton"+item.Number} onClick={()=>editHomework(item.Number)}>Sửa đổi</Button>
                <Button style ={{display: "none"}} color="info" id={"SaveButton"+item.Number} onClick={()=>setHomework(item.Number, item.ID)}>Xác nhận</Button>
            </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableOfStudents;
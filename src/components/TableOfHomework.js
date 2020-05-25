import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { firebaseApp } from "./Firebase";
import { getHomeworkInform } from "../redux/action/getDataHomework";
import Swal from "sweetalert2";

const TableOfStudents = (props) => {
  const dispatch = useDispatch();
  const { homeworkInform } = useSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch(getHomeworkInform());
  }, []);

  const updateTitle = (newTitle, Number) => {
    firebaseApp
      .database()
      .ref("Homework/Test/Homework" + Number)
      .update({
        Title: newTitle,
      });
  };

  const updateIntroduct = (newIntroduct, Number) => {
    firebaseApp
      .database()
      .ref("Homework/Test/Homework" + Number)
      .update({
        Introduct: newIntroduct,
      });
  };

  const updateDeadline = (newDeadline, Number) => {
    firebaseApp
      .database()
      .ref("Homework/Test/Homework" + Number)
      .update({
        Deadline: new Date(newDeadline+"Z").getTime() - 25200000,
        Deadline_Day: newDeadline,
        Stop: 1,
      });
  };

  const editHomework = (Number) => {
    document.getElementById("EditButton" + Number).style.display = "none";
    document.getElementById("SaveButton" + Number).style.display = "block";
    var title = document.getElementById("Title_Row" + Number);
    var introduct = document.getElementById("Introduct_Row" + Number);
    var deadline = document.getElementById("Deadline_Row" + Number);

    var title_data = title.innerHTML;
    var introduct_data = introduct.innerHTML;
    var deadline_data = deadline.innerHTML;

    title.innerHTML =
      "<input type='text' id='title_number" +
      Number +
      "' value='" +
      title_data +
      "'>";
    introduct.innerHTML =
      "<input type='text' id='introduct_number" +
      Number +
      "' value='" +
      introduct_data +
      "'>";
    deadline.innerHTML =
      "<input type='datetime-local' id='deadline_number" +
      Number +
      "' value='" +
      deadline_data +
      "'>";
  };

  const setHomework = (Number) => {
    var Title_Val = document.getElementById("title_number" + Number).value;
    var Introduct_Val = document.getElementById("introduct_number" + Number)
      .value;
    var Deadline_Val = document.getElementById("deadline_number" + Number)
      .value;

    if (Title_Val === "") Title_Val = "Xin nhập tiêu đề";
    else updateTitle(Title_Val, Number);
    if (Introduct_Val === "") Introduct_Val = "Xin nhập miêu tả";
    else updateIntroduct(Introduct_Val, Number);
    if (Deadline_Val === "") Deadline_Val = "Xin nhập deadline";
    else updateDeadline(Deadline_Val, Number);

    document.getElementById("Title_Row" + Number).innerHTML = Title_Val;
    document.getElementById("Introduct_Row" + Number).innerHTML = Introduct_Val;
    document.getElementById("Deadline_Row" + Number).innerHTML = Deadline_Val;
    //  firebaseApp.database().ref("Homework/Test/Homework"+localStorage.getItem("homeworkKey")+"/HistoryCode/"+ID).update({
    //     Mark: mark_val
    //   });
    //   dispatch(getDataStudents(number))
    document.getElementById("EditButton" + Number).style.display = "block";
    document.getElementById("SaveButton" + Number).style.display = "none";
  };

  const deleteHomework = (Number, Title) => {
    Swal.fire({
      title: "Bạn có chắc?",
      text: "Muốn xoá bài tập " + Title + "!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý xoá!",
    }).then((result) => {
      if (result.value) {
        Swal.fire("Đã xoá!", "Bài tập đã được xoá.", "success");
        document.getElementById("Row" + Number).remove();
        firebaseApp
          .database()
          .ref("Homework/Test/Homework" + Number)
          .remove();
      }
    });
  };

  return (
    <div className="tableOfHomework" style={{ paddingTop: "60px" }}>
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên bài</th>
            <th>Miêu tả</th>
            <th>Deadline</th>
            <th>Số sinh viên đã nộp bài</th>
            <th>Chỉnh sửa</th>
            <th>Xoá bài tập</th>
          </tr>
        </thead>
        <tbody id="bodyTable">
          {homeworkInform.map((item) => (
            <tr id={"Row" + item.Number}>
              <th scope="row">{item.Line}</th>
              <td id={"Title_Row" + item.Number}>{item.Title}</td>
              <td
                id={"Introduct_Row" + item.Number}
                style={{ maxWidth: "150px" }}
              >
                {item.Introduct}
              </td>
              <td id={"Deadline_Row" + item.Number}>{item.Deadline_Day}</td>
              <td>{item.NumberOfStudents}</td>
              <td>
                <Button
                  color="primary"
                  id={"EditButton" + item.Number}
                  onClick={() => editHomework(item.Number)}
                >
                  Sửa đổi
                </Button>
                <Button
                  style={{ display: "none" }}
                  color="success"
                  id={"SaveButton" + item.Number}
                  onClick={() => setHomework(item.Number)}
                >
                  Xác nhận
                </Button>
              </td>
              <td>
                <Button
                  color="danger"
                  onClick={() => deleteHomework(item.Number, item.Title)}
                >
                  Xoá
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableOfStudents;

import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getGPA } from '../redux/action/getDataUser'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import "../css/GPA.css";

function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  if (document.getElementById("table-to-xls") !== null) {
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-to-xls");
    tr = table.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      console.log(td)
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("table-to-xls");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase() || Number(x.innerHTML) > Number(y.innerHTML)) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase() || Number(x.innerHTML) < Number(y.innerHTML)) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

export const GPA = () => {
  const dispatch = useDispatch()
  const { dataUser } = useSelector(state => state.userReducer)
  useEffect(()=>{
    dispatch(getGPA())
  },[])
  return (
    <div clasName="tableofMark" style={{paddingTop : "60px"}}>
    <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button"
            table="table-to-xls"
            filename="GPA"
            sheet="tablexls"
            buttonText="Tải về Excel"/>
      <input type="text" id="myInput" onChange={()=>myFunction()} placeholder="Nhập MSSV muốn tìm...."/>
      <Table hover id="table-to-xls">
        <thead>
          <tr>
            <th onClick = {()=> sortTable(1)}>#</th>
            <th onClick = {()=> sortTable(0)}>Họ và tên</th>
            <th onClick = {()=> sortTable(1)}>MSSV</th>
            <th onClick = {()=> sortTable(2)}>Ngày sinh</th>
            <th onClick = {()=> sortTable(3)}>Điểm trung bình</th>
            <th onClick = {()=> sortTable(4)}>Email</th>
          </tr>
        </thead>
        <tbody id ="bodyTable">
            {dataUser.map(item => (
            <tr>
                <th scope="row">{item.Number}</th>
                <td>{item.FullName}</td>
                <td>{item.StudentID}</td>
                <td>{item.Birthday}</td>
                <td style={{fontWeight: 'bold'}}>{Math.round(item.GPA * 100) / 100}</td>
                <td>{item.Email}</td>

            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}


export default GPA
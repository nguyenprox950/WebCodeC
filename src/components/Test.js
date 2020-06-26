import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getGPA } from '../redux/action/getDataUser'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { firebaseApp } from "../components/Firebase";

export const Test = () => {
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
            filename="tablexls"
            sheet="tablexls"
            buttonText="Download as XLS"/>
      <Table hover id="table-to-xls">
        <thead>
          <tr>
            <th>#</th>
            <th>Họ và tên</th>
            <th>MSSV</th>
            <th>Ngày sinh</th>
            <th>Điểm trung bình</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody id ="bodyTable">
            {dataUser.map(item => (
            <tr>
                <th scope="row">{item.Number}</th>
                <td>{item.FullName}</td>
                <td>{item.StudentID}</td>
                <td>{item.Birthday}</td>
                <td></td>
                <td>{item.Email}</td>

            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Test
import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Controlled as CodeMirror } from "react-codemirror2";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { getDataStudents } from '../redux/action/getDataStudents'
import "../css/TableOfStudents.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/cmake/cmake";
import "codemirror/theme/material.css";

var codeHistory, fullName;

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

  const toggle = (history, Name) => {
    if (history !== null) codeHistory = decode(history)
    if (fullName !== null) fullName = Name
      setModal(!modal);
  };

  const toggle2 = () => {
    setModal(!modal);
  }
  
  const dispatch = useDispatch()
  const { dataStudents } = useSelector(state => state.userReducer)
  useEffect(()=>{
    dispatch(getDataStudents())
  },[])

  // pushRow(dataStudents, setModal, modal)

  return (
    <div className="tableOfStudents">
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Họ và tên</th>
            <th>Mã số sinh viên</th>
            <th>Thời gian nộp</th>
            <th>Code nộp</th>
          </tr>
        </thead>
        <tbody id ="bodyTable">
          {dataStudents.map(item => (
            <tr style={{ color: item.color }} >
                <th scope="row">{item.number}</th>
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td>{item.studentID}</td>
                <td>{item.time}</td>
            <td>
                <Button color="info" onClick={()=>toggle(item.codeHistory, item.fullName)}>Lịch sử</Button>
            </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggle2} className="modalHistory">
          <ModalHeader toggle={toggle2}>{fullName}</ModalHeader>
          <ModalBody>
            <CodeMirror
              id="codeHistory"
              value={codeHistory}
              options={{
                mode: "cmake",
                ...codeMirrorOptions,
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle2}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
    </div>
  );
}

export default TableOfStudents;
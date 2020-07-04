import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Controlled as CodeMirror } from "react-codemirror2";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { getMark } from '../redux/action/getDataStudents'
import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike"
import "codemirror/theme/material.css";

var codeHistory, TimeSubmit, GPA, Position

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

const TableMark = (props) => {

  const [modal, setModal] = useState(false);

  const show = (history, Time) => {
    if (history !==codeHistory) codeHistory = decode(history)
    if (Time !== TimeSubmit) TimeSubmit = Time
      setModal(!modal);
  };

  const hidden = () => {
    setModal(!modal);
  }
  
  const dispatch = useDispatch()
  const { dataMark } = useSelector(state => state.userReducer)
  Position = dataMark.length
  if (Position !== 0) {
    GPA = dataMark[Position-1].GPA/dataMark[Position-1].Num
  }
  useEffect(()=>{
    dispatch(getMark())
  },[])


  return (
    <div clasName="tableofMark" style={{paddingTop : "60px"}}>
      <Table hover id="table-to-xls">
        <thead>
          <tr>
            <th>#</th>
            <th>Tên bài</th>
            <th>Điểm</th>
            <th>Code nộp</th>
          </tr>
        </thead>
        <tbody id ="bodyTable">
            {dataMark.map(item => (
            <tr style={{ color: item.Color }} >
                <th scope="row">{item.Num}</th>
                <td>{item.Title}</td>
                <td>{item.Score}</td>
            <td>
                <Button color="info" onClick={()=>show(item.CodeHistory, item.Time)}>Xem</Button>
            </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
        <tr>
            <th scope="row" style ={{fontWeight : "bold", fontSize: "20px"}}>Điểm trung bình</th>
            <td></td>
            <td style ={{fontWeight : "bold", fontSize: "20px"}}>{GPA}</td>
            <td></td>
        </tr>
      </tfoot>
      </Table>
      {/* <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"/> */}
      <Modal isOpen={modal} toggle={hidden} className="modalHistory">
          <ModalHeader toggle={hidden}>{TimeSubmit}</ModalHeader>
          <ModalBody>
            <CodeMirror
              id="codeHistory"
              value={codeHistory}
              options={{
                mode: "text/x-csrc",
                ...codeMirrorOptions,
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={hidden}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
    </div>
  );
}

export default TableMark;
import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import { Button } from "reactstrap";
import { firebaseApp } from "./Firebase";
import "../css/TableOfLecture.css";

const getShow = (number) => {
  var isShow = null;
  firebaseApp
    .database()
    .ref("Lecture/Inform/Lecture" + number + "/isShow")
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        isShow = snapshot.val();
      }
    });
  if (isShow === true) return "Hiện";
  else if (isShow === false) return "Ẩn";
  else return "Hiện";
};

const TableOfLecture = (props) => {
  const [L1, setL1] = useState(getShow(1));
  const [L2, setL2] = useState(getShow(2));
  const [L3, setL3] = useState(getShow(3));
  const [L4, setL4] = useState(getShow(4));
  const [L5, setL5] = useState(getShow(5));
  const [L6, setL6] = useState(getShow(6));
  const [L7, setL7] = useState(getShow(7));
  const [L8, setL8] = useState(getShow(8));
  const [L9, setL9] = useState(getShow(9));
  const [L10, setL10] = useState(getShow(10));
 
  const setShow = (number, isShow) => {
    if (number === 1 && isShow === true) setL1("Hiện");
    if (number === 1 && isShow === false) setL1("Ẩn");
    if (number === 1) {
      if (isShow === true) setL1("Hiện");
      else setL1("Ẩn");
    } else if (number === 2) {
      if (isShow === true) setL2("Hiện");
      else setL2("Ẩn");
    } else if (number === 3) {
      if (isShow === true) setL3("Hiện");
      else setL3("Ẩn");
    } else if (number === 4) {
      if (isShow === true) setL4("Hiện");
      else setL4("Ẩn");
    } else if (number === 5) {
      if (isShow === true) setL5("Hiện");
      else setL5("Ẩn");
    } else if (number === 6) {
      if (isShow === true) setL6("Hiện");
      else setL6("Ẩn");
    } else if (number === 7) {
      if (isShow === true) setL7("Hiện");
      else setL7("Ẩn");
    } else if (number === 8) {
      if (isShow === true) setL8("Hiện");
      else setL8("Ẩn");
    } else if (number === 9) {
      if (isShow === true) setL9("Hiện");
      else setL9("Ẩn");
    } else if (number === 10) {
      if (isShow === true) setL10("Hiện");
      else setL10("Ẩn");
    }
    firebaseApp
      .database()
      .ref("Lecture/Inform/Lecture" + number)
      .set({
        isShow: isShow,
      });
  };

  return (
    <div className="tableOfLecture">
      <Table hover>
        <thead>
          <tr>
            <th>Môn học</th>
            <th>Chương</th>
            <th>Tên chương</th>
            <th>Trạng thái</th>
            <th>Ẩn/Hiện</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Kỹ thuật lập trình C</td>
            <td>1</td>
            <td>Giới thiệu</td>
            <td>{L1}</td>
            <td>
              <Button id="hide" color="info" onClick={() => setShow(1, true)}>
                Hiện
              </Button>
              <Button
                id="show"
                color="danger"
                onClick={() => setShow(1, false)}
              >
                Ẩn
              </Button>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Kỹ thuật lập trình C</td>
            <td>2</td>
            <td>Kiểu dữ liệu cơ sở và các phép toán</td>
            <td>{L2}</td>
            <td>
              <Button id="hide" color="info" onClick={() => setShow(2, true)}>
                Hiện
              </Button>
              <Button
                id="show"
                color="danger"
                onClick={() => setShow(2, false)}
              >
                Ẩn
              </Button>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Kỹ thuật lập trình C</td>
            <td>3</td>
            <td>Cấu trúc điều khiển</td>
            <td>{L3}</td>
            <td>
              <Button id="hide" color="info" onClick={() => setShow(3, true)}>
                Hiện
              </Button>
              <Button
                id="show"
                color="danger"
                onClick={() => setShow(3, false)}
              >
                Ẩn
              </Button>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Kỹ thuật lập trình C</td>
            <td>4</td>
            <td>Con trỏ và hàm</td>
            <td>{L4}</td>
            <td>
              <Button id="hide" color="info" onClick={() => setShow(4, true)}>
                Hiện
              </Button>
              <Button
                id="show"
                color="danger"
                onClick={() => setShow(4, false)}
              >
                Ẩn
              </Button>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Kỹ thuật lập trình C</td>
            <td>5</td>
            <td>Mảng dữ liệu</td>
            <td>{L5}</td>
            <td>
              <Button id="hide" color="info" onClick={() => setShow(5, true)}>
                Hiện
              </Button>
              <Button
                id="show"
                color="danger"
                onClick={() => setShow(5, false)}
              >
                Ẩn
              </Button>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Kỹ thuật lập trình C</td>
            <td>6</td>
            <td>Chuỗi</td>
            <td>{L6}</td>
            <td>
              <Button id="hide" color="info" onClick={() => setShow(6, true)}>
                Hiện
              </Button>
              <Button
                id="show"
                color="danger"
                onClick={() => setShow(6, false)}
              >
                Ẩn
              </Button>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Kỹ thuật lập trình C</td>
            <td>7</td>
            <td>Kiểu dữ liệu cấu trúc</td>
            <td>{L7}</td>
            <td>
              <Button id="hide" color="info" onClick={() => setShow(7, true)}>
                Hiện
              </Button>
              <Button
                id="show"
                color="danger"
                onClick={() => setShow(7, false)}
              >
                Ẩn
              </Button>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Kỹ thuật lập trình C</td>
            <td>8</td>
            <td>Kiểu tập tin</td>
            <td>{L8}</td>
            <td>
              <Button id="hide" color="info" onClick={() => setShow(8, true)}>
                Hiện
              </Button>
              <Button
                id="show"
                color="danger"
                onClick={() => setShow(8, false)}
              >
                Ẩn
              </Button>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Kỹ thuật lập trình C</td>
            <td>9</td>
            <td>Kỹ thuật duyệt mảng sử dụng con trỏ</td>
            <td>{L9}</td>
            <td>
              <Button id="hide" color="info" onClick={() => setShow(9, true)}>
                Hiện
              </Button>
              <Button
                id="show"
                color="danger"
                onClick={() => setShow(9, false)}
              >
                Ẩn
              </Button>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td>Kỹ thuật lập trình C</td>
            <td>10</td>
            <td>Bộ nhớ động và ứng dụng trong DSLK</td>
            <td>{L10}</td>
            <td>
              <Button id="hide" color="info" onClick={() => setShow(10, true)}>
                Hiện
              </Button>
              <Button
                id="show"
                color="danger"
                onClick={() => setShow(10, false)}
              >
                Ẩn
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TableOfLecture;

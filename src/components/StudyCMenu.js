import React from "react";
import "antd/dist/antd.css";
import "../css/StudyCMenu.css";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { firebaseApp } from "../components/Firebase";

const StudyCMenu = () => {
  const handleClick = (e) => {
    if (localStorage.getItem("emailID") !== null) {
    localStorage.setItem("Lecture", e.key);
    firebaseApp
      .database()
      .ref(
        "Lecture/" +
          localStorage.getItem("emailID") +
          "/Lecture" +
          localStorage.getItem("Lecture")
      )
      .set({
        isRead: true,
      });
    }
  };

  const setColor = (key) => {
    var isRead;
    firebaseApp
      .database()
      .ref(
        "Lecture/" +
          localStorage.getItem("emailID") +
          "/Lecture" +
          key +
          "/isRead"
      )
      .on("value", function (snapshot) {
        if (snapshot.exists) {
          isRead = snapshot.val();
        }
      });

    console.log(isRead);
    if (isRead) {
      return "blue";
    } else {
      return null;
    }
  };

  return (
    <div className="StudyC">
      <div id="studyCMenu">
        <Menu onClick={handleClick} style={{ width: 360 }} mode="inline">
          <h4>Kỹ thuật lập trình C</h4>
          <Menu.Item key="1">
            <Link style={{ color: setColor(1) }} to="/studyc/lecture">
              Chương 1: Giới thiệu
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link style={{ color: setColor(2) }} to="/studyc/lecture">
              Chương 2: Kiểu dữ liệu cơ sở và các phép toán
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link style={{ color: setColor(3) }} to="/studyc/lecture">
              Chương 3: Cấu trúc điều khiển
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link style={{ color: setColor(4) }} to="/studyc/lecture">
              Chương 4: Con trỏ và hàm
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link style={{ color: setColor(5) }} to="/studyc/lecture">
              Chương 5: Mảng dữ liệu
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link style={{ color: setColor(6) }} to="/studyc/lecture">
              Chương 6: Chuỗi
            </Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link style={{ color: setColor(7) }} to="/studyc/lecture">
              Chương 7: Kiểu dữ liệu cấu trúc
            </Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link style={{ color: setColor(8) }} to="/studyc/lecture">
              Chương 8: Kiểu tập tin
            </Link>
          </Menu.Item>
          <Menu.Item key="9">
            <Link style={{ color: setColor(9) }} to="/studyc/lecture">
              Chương 9: Kỹ thuật duyệt mảng sử dụng con trỏ
            </Link>
          </Menu.Item>
          <Menu.Item key="10">
            <Link style={{ color: setColor(10) }} to="/studyc/lecture">
              Chương 10: Bộ nhớ động và ứng dụng trong DSLK
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default StudyCMenu;

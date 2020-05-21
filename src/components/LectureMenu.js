import React, { useState } from "react";
import "antd/dist/antd.css";
import "../css/LectureMenu.css";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { firebaseApp } from "./Firebase";

const setShow = (number) => {
  var isShow;
  firebaseApp
    .database()
    .ref("Lecture/Inform/Lecture" + number + "/isShow")
    .on("value", function (snapshot) {
      if (snapshot.exists) {
        isShow = snapshot.val();
      }
    });
  if (isShow) {
    return false;
  } else {
    return true;
  }
};

const LectureMenu = () => {
  const [count, setCount] = useState(
    0 + "ngày " + 0 + "giờ " + 0 + "phút " + 0 + "giây "
  );

  var x = setInterval(function () {
    var countDownDate = new Date("Jan 5, 2030 15:37:25").getTime();
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element
    setCount(
      days + "ngày " + hours + "giờ " + minutes + "phút " + seconds + "giây "
    );
  }, 100);

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
    if (isRead) {
      return "blue";
    } else {
      return null;
    }
  };

  return (
    <div className="LectureMenu">
      <p hidden>{count}</p>
      <div id="lectureMenu">
        <Menu onClick={handleClick} style={{ width: "360px" }} mode="inline">
          <h4>Kỹ thuật lập trình C</h4>
          <Menu.Item key="1" hidden={setShow(1)}>
            <Link style={{ color: setColor(1) }} to="/studyc/lecture">
              Chương 1: Giới thiệu
            </Link>
          </Menu.Item>
          <Menu.Item key="2" hidden={setShow(2)}>
            <Link style={{ color: setColor(2) }} to="/studyc/lecture">
              Chương 2: Kiểu dữ liệu cơ sở và các phép toán
            </Link>
          </Menu.Item>
          <Menu.Item key="3" hidden={setShow(3)}>
            <Link style={{ color: setColor(3) }} to="/studyc/lecture">
              Chương 3: Cấu trúc điều khiển
            </Link>
          </Menu.Item>
          <Menu.Item key="4" hidden={setShow(4)}>
            <Link style={{ color: setColor(4) }} to="/studyc/lecture">
              Chương 4: Con trỏ và hàm
            </Link>
          </Menu.Item>
          <Menu.Item key="5" hidden={setShow(5)}>
            <Link style={{ color: setColor(5) }} to="/studyc/lecture">
              Chương 5: Mảng dữ liệu
            </Link>
          </Menu.Item>
          <Menu.Item key="6" hidden={setShow(6)}>
            <Link style={{ color: setColor(6) }} to="/studyc/lecture">
              Chương 6: Chuỗi
            </Link>
          </Menu.Item>
          <Menu.Item key="7" hidden={setShow(7)}>
            <Link style={{ color: setColor(7) }} to="/studyc/lecture">
              Chương 7: Kiểu dữ liệu cấu trúc
            </Link>
          </Menu.Item>
          <Menu.Item key="8" hidden={setShow(8)}>
            <Link style={{ color: setColor(8) }} to="/studyc/lecture">
              Chương 8: Kiểu tập tin
            </Link>
          </Menu.Item>
          <Menu.Item key="9" hidden={setShow(9)}>
            <Link style={{ color: setColor(9) }} to="/studyc/lecture">
              Chương 9: Kỹ thuật duyệt mảng sử dụng con trỏ
            </Link>
          </Menu.Item>
          <Menu.Item key="10" hidden={setShow(10)}>
            <Link style={{ color: setColor(10) }} to="/studyc/lecture">
              Chương 10: Bộ nhớ động và ứng dụng trong DSLK
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default LectureMenu;

import React, { useState } from "react";
import "antd/dist/antd.css";
import "../css/TestMenu.css";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { firebaseApp } from "../components/Firebase";

const TestMenu = (props) => {
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
    localStorage.setItem("testKey", e.key);
  };
  const setColor = (key) => {
    var condition;
    firebaseApp
      .database()
      .ref(
        "historyCode/" +
          localStorage.getItem("emailID") +
          "/Test" +
          key +
          "/Right/isRight"
      )
      .on("value", function (snapshot) {
        if (snapshot.exists) {
          condition = snapshot.val();
        }
      });
    if (condition === false) {
      return "red";
    } else if (condition === true) {
      return "green";
    } else {
      return null;
    }
  };

  return (
    <div className="Test">
      <p hidden>{count}</p>
      <div id="testMenu">
        <Menu onClick={handleClick} style={{ width: 256 }} mode="inline">
          <h4>Bài tập về nhập xuất</h4>
          <Menu.Item key="1">
            <Link style={{ color: setColor(1) }} to={`/checkcode/test${1}`}>
              1. Hello World
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link style={{ color: setColor(2) }} to={`/checkcode/test${2}`}>
              2. Tam giác cân
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link style={{ color: setColor(3) }} to={`/checkcode/test${3}`}>
              3. Tính tổng hai số
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link style={{ color: setColor(4) }} to={`/checkcode/test${4}`}>
              4. Tính số mũ
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link style={{ color: setColor(5) }} to={`/checkcode/test${5}`}>
              5. Ngày tháng năm
            </Link>
          </Menu.Item>
          <h4>Bài tập về If else</h4>
          <Menu.Item key="6">
            <Link style={{ color: setColor(6) }} to={`/checkcode/test${6}`}>
              6. Max 2
            </Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link style={{ color: setColor(7) }} to={`/checkcode/test${7}`}>
              7. Max 3
            </Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link style={{ color: setColor(8) }} to={`/checkcode/test${8}`}>
              8. Phương trình bậc 2
            </Link>
          </Menu.Item>
          <h4>Bài tập về vòng lập</h4>
          <Menu.Item key="9">
            <Link style={{ color: setColor(9) }} to={`/checkcode/test${9}`}>
              9. In các số từ 1 đến n
            </Link>
          </Menu.Item>
          <Menu.Item key="10">
            <Link style={{ color: setColor(10) }} to={`/checkcode/test${10}`}>
              10. Tổng các số từ 1 đến n
            </Link>
          </Menu.Item>
          <Menu.Item key="11">
            <Link style={{ color: setColor(11) }} to={`/checkcode/test${11}`}>
              11. Kiểm tra số nguyên tố
            </Link>
          </Menu.Item>
          <Menu.Item key="12">
            <Link style={{ color: setColor(12) }} to={`/checkcode/test${12}`}>
              12. Chữ số lớn nhất
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default TestMenu;

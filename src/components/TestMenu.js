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
          <h4>Bài tập thực hành</h4>
          <h4>Chương 1: </h4>
          <Menu.Item key="1">
            <Link style={{ color: setColor(1) }} to={`/checkcode/test${1}`}>
              1. Hello VLTH
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link style={{ color: setColor(2) }} to={`/checkcode/test${2}`}>
              2. Tam giác vuông trên bên trái
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link style={{ color: setColor(3) }} to={`/checkcode/test${3}`}>
              3. Tam giác vuông trên bên phải
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link style={{ color: setColor(4) }} to={`/checkcode/test${4}`}>
              4. Tam giác vuông dưới bên trái
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link style={{ color: setColor(5) }} to={`/checkcode/test${5}`}>
              5. Tam giác vuông dưới bên phải
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link style={{ color: setColor(6) }} to={`/checkcode/test${6}`}>
              6. Tam giác cân
            </Link>
          </Menu.Item>
          <h4>Chương 2: </h4>
          <Menu.Item key="7">
            <Link style={{ color: setColor(7) }} to={`/checkcode/test${7}`}>
              7. Tổng hiệu tích thương
            </Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link style={{ color: setColor(8) }} to={`/checkcode/test${8}`}>
              8. Chu vi, diện tích HCN
            </Link>
          </Menu.Item>
          <Menu.Item key="9">
            <Link style={{ color: setColor(9) }} to={`/checkcode/test${9}`}>
              9. Ngày tháng năm
            </Link>
          </Menu.Item>
          <Menu.Item key="10">
            <Link style={{ color: setColor(10) }} to={`/checkcode/test${10}`}>
              10. Giờ phút giây
            </Link>
          </Menu.Item>
          <Menu.Item key="11">
            <Link style={{ color: setColor(11) }} to={`/checkcode/test${11}`}>
              11. Tổng các chữ số
            </Link>
          </Menu.Item>
          <h4>Chương 3: </h4>
          <Menu.Item key="12">
            <Link style={{ color: setColor(12) }} to={`/checkcode/test${12}`}>
              12. Max 3
            </Link>
          </Menu.Item>
          <Menu.Item key="13">
            <Link style={{ color: setColor(13) }} to={`/checkcode/test${13}`}>
              13. Số nguyên tố
            </Link>
          </Menu.Item>
          <Menu.Item key="14">
            <Link style={{ color: setColor(14) }} to={`/checkcode/test${14}`}>
              14. Số nguyên tố nhỏ hơn n
            </Link>
          </Menu.Item>
          <Menu.Item key="15">
            <Link style={{ color: setColor(15) }} to={`/checkcode/test${15}`}>
              15. Siêu nguyên tố
            </Link>
          </Menu.Item>
          <h4>Chương 5: </h4>
          <Menu.Item key="16">
            <Link style={{ color: setColor(16) }} to={`/checkcode/test${16}`}>
              16. Sắp xếp mảng tăng
            </Link>
          </Menu.Item>
          <Menu.Item key="17">
            <Link style={{ color: setColor(17) }} to={`/checkcode/test${17}`}>
              17. Sắp xếp mảng giảm
            </Link>
          </Menu.Item>
          <Menu.Item key="18">
            <Link style={{ color: setColor(18) }} to={`/checkcode/test${18}`}>
              18. Tách chẵn lẻ trong mảng
            </Link>
          </Menu.Item>
          <Menu.Item key="19">
            <Link style={{ color: setColor(19) }} to={`/checkcode/test${19}`}>
              19. Đổi hệ thập phân sang nhị phân
            </Link>
          </Menu.Item>
          <Menu.Item key="20">
            <Link style={{ color: setColor(20) }} to={`/checkcode/test${20}`}>
              20. Ba số lớn nhất trong mảng
            </Link>
          </Menu.Item>
          <h4>Chương 6: </h4>
          <Menu.Item key="21">
            <Link style={{ color: setColor(21) }} to={`/checkcode/test${21}`}>
              21. Đếm số lần xuất hiện của kí tự
            </Link>
          </Menu.Item>
          <Menu.Item key="22">
            <Link style={{ color: setColor(22) }} to={`/checkcode/test${22}`}>
              22. Đếm số từ trong chuỗi
            </Link>
          </Menu.Item>
          <Menu.Item key="23">
            <Link style={{ color: setColor(23) }} to={`/checkcode/test${23}`}>
              23. Chuyển chữ hoa và thường
            </Link>
          </Menu.Item>
          <Menu.Item key="24">
            <Link style={{ color: setColor(24) }} to={`/checkcode/test${24}`}>
              24. Tách tên người
            </Link>
          </Menu.Item>
          <Menu.Item key="25">
            <Link style={{ color: setColor(25) }} to={`/checkcode/test${25}`}>
              25. Tìm từ trong chuỗi
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default TestMenu;

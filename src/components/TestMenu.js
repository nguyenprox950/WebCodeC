import React, { useState } from "react";
import "antd/dist/antd.css";
import "../css/TestMenu.css";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { firebaseApp } from "../components/Firebase";

const TestMenu = (props) => {

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
      <div id="testMenu">
        <Menu onClick={handleClick} style={{ width: 256 }} mode="inline">
          <h4>Bài tập về nhập xuất</h4>
          <Menu.Item key="1">
            <Link style={{ color: setColor(1) }} to="/test/checkcode">
              1. Hello World
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link style={{ color: setColor(2) }} to="/test/checkcode">
              2. Tam giác cân
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link style={{ color: setColor(3) }} to="/test/checkcode">
              3. Tính tổng hai số
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link style={{ color: setColor(4) }} to="/test/checkcode">
              4. Tính số mũ
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link style={{ color: setColor(5) }} to="/test/checkcode">
              5. Ngày tháng năm
            </Link>
          </Menu.Item>
          <h4>Bài tập về If else</h4>
          <Menu.Item key="6">
            <Link style={{ color: setColor(6) }} to="/test/checkcode">
              6. Max 2
            </Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link style={{ color: setColor(7) }} to="/test/checkcode">
              7. Max 3
            </Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link style={{ color: setColor(8) }} to="/test/checkcode">
              8. Phương trình bậc 2
            </Link>
          </Menu.Item>
          <h4>Bài tập về vòng lập</h4>
          <Menu.Item key="9">
            <Link style={{ color: setColor(9) }} to="/test/checkcode">
              9. In các số từ 1 đến n
            </Link>
          </Menu.Item>
          <Menu.Item key="10">
            <Link style={{ color: setColor(10) }} to="/test/checkcode">
              10. Tổng các số từ 1 đến n
            </Link>
          </Menu.Item>
          <Menu.Item key="11">
            <Link style={{ color: setColor(11) }} to="/test/checkcode">
              11. Kiểm tra số nguyên tố
            </Link>
          </Menu.Item>
          <Menu.Item key="12">
            <Link style={{ color: setColor(12) }} to="/test/checkcode">
              12. Chữ số lớn nhất
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default TestMenu;

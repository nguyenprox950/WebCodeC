import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../css/TestMenu.css";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { firebaseApp } from "./Firebase";
import { getDataHomework } from "../redux/action/getDataHomework";
import { useDispatch, useSelector } from "react-redux";
import { getDataStudents } from "../redux/action/getDataStudents";

const HomeworkMenu = (props) => {
  const [activeTab, setActiveTab] = useState("0");

  const dispatch = useDispatch();
  const { dataHomework } = useSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch(getDataHomework());
  }, []);

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
  }, 1000);

  const handleClick = (e) => {
    localStorage.setItem("homeworkKey", e.key);
    if (localStorage.getItem("role") === "admin")
      if (activeTab !== e.key) {
        setActiveTab(e.key);
        dispatch(getDataStudents(e.key));
      }
  };
  const setColor = (key) => {
    var condition;
    firebaseApp
      .database()
      .ref(
        "Homework/Test/Homework" +
          key +
          "/HistoryCode/" +
          localStorage.getItem("emailID") +
          "/isRight"
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
          <h4>Bài tập về nhà</h4>
          {dataHomework.map((item) => (
            <Menu.Item key={"" + item.Number}>
              {localStorage.getItem("role") === "admin" ? (
                <Link
                  style={{ color: setColor(item.Number) }}
                  to={`/homework/table${item.Number}`}
                >
                  {item.Line}. {item.Title}
                </Link>
              ) : (
                <Link
                  style={{ color: setColor(item.Number) }}
                  to={`/homework/test${item.Number}`}
                >
                  {item.Line}. {item.Title}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </div>
  );
};

export default HomeworkMenu;

import React from "react";
import "antd/dist/antd.css";
import "../css/TestMenu.css";
import { Menu } from "antd";
import { Link } from 'react-router-dom';
import {firebaseApp} from '../components/Firebase'

const testMenu = () => {
  const handleClick = e => {
    localStorage.setItem('testKey', e.key)
  };
  const setColor = (key) => {
    var condition;
    firebaseApp.database().ref("historyCode/"+ localStorage.getItem('emailID') + "/Test" + key + "/right/right").on('value', function(snapshot) {
      if (snapshot.exists){
        condition = snapshot.val()
      }
    })
    if (condition === "wrong") {
      return "red";
    }
    else if (condition === "right"){
      return "green";
    } else {
      return null;
    }
  }

  return (
    <div className="Test">
      <div id="testMenu">
        <Menu
          onClick={handleClick}
          style={{ width: 256 }}
          mode="inline"
        >
          <h4>Bài tập về nhập xuất</h4>
          <Menu.Item key='1'>
          <Link style={{ color: setColor(1)}} to='/Test/CheckCode'>1. Hello, World</Link>
          </Menu.Item>
          <Menu.Item key='2'>
          <Link style={{ color: setColor(2)}} to='/Test/CheckCode'>2. Tam giác cân</Link>
          </Menu.Item>
          <Menu.Item key='3'>
          <Link style={{ color: setColor(3)}} to='/Test/CheckCode'>3. Tính tổng hai số</Link>
          </Menu.Item>
          <Menu.Item key='4'>
          <Link  style={{ color: setColor(4)}}to='/Test/CheckCode'>4. Tính số mũ</Link>
          </Menu.Item>
          <Menu.Item key='5'>
          <Link  style={{ color: setColor(5)}}to='/Test/CheckCode'>5. Ngày tháng năm</Link>
          </Menu.Item>
          <h4>Bài tập về If else</h4>
          <Menu.Item key='6'>
          <Link  style={{ color: setColor(6)}}to='/Test/CheckCode'>6. Max 2</Link>
          </Menu.Item>
          <Menu.Item key='7'>
          <Link  style={{ color: setColor(7)}}to='/Test/CheckCode'>7. Max 3</Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default testMenu
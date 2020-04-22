import React from "react";
import "antd/dist/antd.css";
import "../css/StudyCMenu.css";
import { Menu } from "antd";
import { Link } from 'react-router-dom';
import {firebaseApp} from '../components/Firebase'

const StudyCMenu = () => {
  const handleClick = e => {
    localStorage.setItem('Lecture', e.key)
  };

  return (
    <div className="StudyC">
      <div id="studyCMenu">
        <Menu
          onClick={handleClick}
          style={{ width: 340 }}
          mode="inline"
        >
          <h4>Kỹ thuật lập trình C</h4>
          <Menu.Item key='1'>
          <Link to='/StudyC/Lecture'>Chương 1: Giới thiệu</Link>
          </Menu.Item>
          <Menu.Item key='2'>
          <Link to='/StudyC/Lecture'>Chương 2: Kiểu dữ liệu cơ sở và các phép toán</Link>
          </Menu.Item>
          <Menu.Item key='3'>
          <Link to='/StudyC/Lecture'>Chương 3: Cấu trúc điều khiển</Link>
          </Menu.Item>
          <Menu.Item key='4'>
          <Link to='/StudyC/Lecture'>Chương 4: Con trỏ và hàm</Link>
          </Menu.Item>
          <Menu.Item key='5'>
          <Link to='/StudyC/Lecture'>Chương 5: Mảng dữ liệu</Link>
          </Menu.Item>
          <Menu.Item key='6'>
          <Link to='/StudyC/Lecture'>Chương 6: Chuỗi</Link>
          </Menu.Item>
          <Menu.Item key='7'>
          <Link to='/StudyC/Lecture'>Chương 7: Kiểu dữ liệu cấu trúc</Link>
          </Menu.Item>
          <Menu.Item key='8'>
          <Link to='/StudyC/Lecture'>Chương 8: Kiểu tập tin</Link>
          </Menu.Item>
          <Menu.Item key='9'>
          <Link to='/StudyC/Lecture'>Chương 9: Kỹ thuật duyệt mảng sử dụng con trỏ</Link>
          </Menu.Item>
          <Menu.Item key='10'>
          <Link to='/StudyC/Lecture'>Chương 10: Bộ nhớ động và ứng dụng trong DSLK</Link>
          </Menu.Item>
          </Menu>
      </div>
    </div>
  );
};

export default StudyCMenu
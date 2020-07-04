import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/AppHeader.css";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonToggle,
} from "reactstrap";
import { Menu } from 'antd';
import { useSelector } from "react-redux";
import { firebaseApp } from "./Firebase";

const AppHeader = (props) => {
  const { userInform } = useSelector((state) => state.userReducer);

  const handleLogOut = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(function () {
        localStorage.clear();
        window.location.reload();
      })
      .catch(function (error) {});
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" className="Header">
        <NavbarBrand href="/">Code C</NavbarBrand>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              {localStorage.getItem("role") === "student"? (
                <NavLink className="item">
                  <Link to="/introduction">Hướng dẫn làm bài</Link>
                </NavLink>
              ) : null}
            </NavItem>
            <NavItem>
              {localStorage.getItem("role") === "student" || localStorage.getItem("role") === "admin"? (
                <NavLink className="item">
                  <Link to="/studyc">Học C</Link>
                </NavLink>
              ) : null}
            </NavItem>
            <NavItem>
              {localStorage.getItem("role") === "student" || localStorage.getItem("role") === "admin"? (
                <NavLink className="item">
                  <Link to="/compiler">DevC</Link>
                </NavLink>
              ) : null}
            </NavItem>
              <NavItem>
                {localStorage.getItem("role") === "student" || localStorage.getItem("role") === "admin"? (
                  <NavLink className="item">
                    <Link to="/checkcode">Bài tập</Link>
                  </NavLink>
                ) : null}
              </NavItem>
            {localStorage.getItem("role") === "student" ? (
              <NavItem>
                <NavLink className="item">
                  <Link to="/homework">Bài tập về nhà</Link>
                </NavLink>
              </NavItem>
            ) : null}
          </Nav>
          {Object.keys(userInform).length !== 0 ? (
            <UncontrolledDropdown inNavbar className="Header-Profile">
              <DropdownToggle>
                {localStorage.getItem("role") === "admin" ? (
                  <span style={{ color: "black" }}>{userInform.fullName} (Giảng viên)</span>
                ) : null}
                {localStorage.getItem("role") === "student" ? (
                  <span style={{ color: "black" }}>{userInform.fullName} (Sinh viên)</span>
                ) : null}
                <img src="../img/logo.png" height="30px" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink>
                    <Link to={`/profile/${userInform.email}/inform`}>
                      Thông tin cá nhân
                    </Link>
                  </NavLink>
                </DropdownItem>
                {localStorage.getItem("role") === "student" ? (
                  <DropdownItem>
                    <NavLink className="item">
                      <Link to="/tableMark">Bảng điểm</Link>
                    </NavLink>
                  </DropdownItem>
                ) : null}
                {localStorage.getItem("role") === "admin" ? (
                  <DropdownItem>
                    <NavLink className="item">
                      <Link to="/tableoflecture">Quản lý bài giảng</Link>
                    </NavLink>
                  </DropdownItem>
                ) : null}
                {localStorage.getItem("role") === "admin" ? (
                  <DropdownItem>
                    <NavLink className="item">
                      <Link to="/homeworkteacher">Tạo bài tập về nhà</Link>
                    </NavLink>
                  </DropdownItem>
                ) : null}
                {localStorage.getItem("role") === "admin" ? (
                  <DropdownItem>
                    <NavLink className="item">
                      <Link to="/tableofhomework">
                        Chỉnh sửa bài tập về nhà
                      </Link>
                    </NavLink>
                  </DropdownItem>
                ) : null}
                {localStorage.getItem("role") === "admin" ? (
                  <DropdownItem>
                    <NavLink className="item">
                      <Link to="/homework">Danh sách nộp bài tập về nhà</Link>
                    </NavLink>
                  </DropdownItem>
                ) : null}
                {localStorage.getItem("role") === "admin" ? (
                  <DropdownItem>
                    <NavLink className="item">
                      <Link to="/gpa">Bảng điểm trung bình</Link>
                    </NavLink>
                  </DropdownItem>
                ) : null}
                <DropdownItem divider />
                <DropdownItem>
                  <NavLink onClick={handleLogOut}>
                    <Link to="/">Đăng xuất</Link>
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <ButtonToggle color="primary" tag={Link} to="/signin">
              Đăng nhập
            </ButtonToggle>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default AppHeader;

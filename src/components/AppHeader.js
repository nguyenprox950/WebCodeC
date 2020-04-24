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
  NavbarToggler
} from "reactstrap";
import { useSelector } from "react-redux";
import { firebaseApp } from "./Firebase";

const AppHeader = (props) => {
  const { userInform } = useSelector(state => state.userReducer);

  const handleLogOut = () => {
    firebaseApp.auth().signOut().then(function() {
      localStorage.clear();
      window.location.reload()
    }).catch(function(error) {
    });
  }
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" className="Header">
        <NavbarBrand href="/Home">Code C</NavbarBrand>
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/Home">Trang chủ</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
              <Link to="/Compiler">DevC</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
              <Link to="/Test">Bài lập</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
              <Link to="/StudyC">Học C</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
              <Link to="/HomeWorkStudent">Bài tập về nhà (Student)</Link>
              </NavLink>
            </NavItem>
            <NavItem>
              {localStorage.getItem("role") === "admin" ? (
              <NavLink>
              <Link to="/Translate">Dịch code</Link>
              </NavLink>
              ) : (
                <div></div>
              )}
            </NavItem>
            <NavItem>
              {localStorage.getItem("role") === "admin" ? (
              <NavLink>
              <Link to="/HomeWork">Bài tập về nhà (Set up)</Link>
              </NavLink>
              ) : (
                <div></div>
              )}
            </NavItem>
          </Nav>
          {Object.keys(userInform).length !== 0 ? (
            <UncontrolledDropdown inNavbar className="Header-Profile">
              <DropdownToggle>
                <span style={{ color: "black" }}>{userInform.fullName}</span>
                <img src="../img/logo.png" height="30px" />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink>
                    <Link to="/Profile/ProfileInform">Thông tin cá nhân</Link>
                  </NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <NavLink onClick= {handleLogOut}
                  >
                    <Link to="/Home" >Đăng xuất</Link>
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <ButtonToggle
              color="primary"
              tag={Link}
              to="/SignIn"
            >
              Đăng nhập
            </ButtonToggle>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default (AppHeader);

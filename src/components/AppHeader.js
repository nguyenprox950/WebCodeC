import React from "react";
import { withRouter, Link } from "react-router-dom";
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
  ButtonToggle
} from "reactstrap";
import { useSelector } from "react-redux";
import { firebaseApp } from "./Firebase";

const AppHeader = props => {
  const { userInform } = useSelector(state => state.userReducer);

  const handleLogOut = () => {
    firebaseApp.auth().signOut().then(function() {
      localStorage.removeItem("user");
      window.location.reload()
    }).catch(function(error) {
    });
  }

  return (
    <div>
      <Navbar color="light" light expand="md" className="Header">
        <NavbarBrand href="/Home">Code C</NavbarBrand>
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Hướng dẫn</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
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
              onClick={() => props.history.push("/SignIn")}
            >
              Đăng nhập
            </ButtonToggle>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default withRouter(AppHeader);

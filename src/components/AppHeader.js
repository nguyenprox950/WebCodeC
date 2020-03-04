import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../css/AppHeader.css'
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
} from 'reactstrap';

class AppHeader extends Component {
  render () {
    let headerItem 
    if (localStorage.getItem('login') === null){
      headerItem = [
        <ButtonToggle color="primary" onClick={()=> this.props.history.push('/SignIn')}>Đăng nhập</ButtonToggle>
      ]
    }
    else {
      headerItem = [
        <DropdownToggle >
          <img src="../img/logo.png" height="30px"></img>
        </DropdownToggle>,
        <DropdownMenu right>
          <DropdownItem >
            <NavLink href="/Profile">Thông tin cá nhân</NavLink>
          </DropdownItem>
          <DropdownItem divider/>
          <DropdownItem>
              <NavLink href="/Home" onClick={() => {localStorage.removeItem('login')}}>Đăng xuất</NavLink>
          </DropdownItem>
        </DropdownMenu>
      ]
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
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
            </Nav>
            <UncontrolledDropdown inNavbar className="Header-Profile">
              {headerItem}
            </UncontrolledDropdown>
          </Collapse>
      </Navbar>
    </div>
    );
  }
}

export default withRouter(AppHeader);
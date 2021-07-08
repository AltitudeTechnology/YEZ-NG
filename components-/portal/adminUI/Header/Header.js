import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
// import PropTypes from 'prop-types';

import signout from '../../../../lib/auth/signout'

import {
  Nav,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from 'reactstrap';

class Header extends Component {
  sidebarToggle = (e) => {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize = (e) => {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle = (e) => {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <NavbarBrand href="#"></NavbarBrand>
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>
          <span className="navbar-toggler-icon"></span>
        </NavbarToggler>
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="#">Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Broadcasts</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Messages</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <ApolloConsumer>
              {client => (
                <NavLink
                  href="#!" 
                  onClick={()=>signout(client)}>
                  Logout <i className="icon-logout"></i>
                </NavLink>
              )}
              {/* {client => (
              <a href="#!"
                  onClick={async () => {
                  const { data : { userIsAuthenticated } } = await client.query({query: USER_ISAUTHENTICATED_QUERY});
                  if (userIsAuthenticated) {
                      console.log('isAuth - fetching cookies');
                      const {userType, token} = cookie.parse(document.cookie)
                      if (userType && token) {
                          let target = `/user/dashboard`;
                          userType == 'PretCandidate' && (target=`/user/dashboard`);
                          userType == 'Institution' && (target=`/institution/dashboard`);
                          redirect({}, target)
                      } else {
                      toggleModal();
                      }
                  } else {
                      toggleModal();
                  }
                  }}>Login</a>
              )} */}
              </ApolloConsumer>
          </NavItem>
          <div style={{minWidth: '10px'}}/>
        </Nav>
      </header>
    );
  }
}

export default Header;

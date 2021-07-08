import { Component, Fragment } from "react";
import { withRouter } from "next/router";
import Link from "next/link";

// import {Container, Row, Col} from 'reactstrap';
import styled from "styled-components";
import NavLink, { StyledNavLink } from "./NavLink";
import routes from "../../routes";

const StyledMenuArea = styled.div`
  background-color: #fff;
  transition: 0.5s;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 999;
`;
const StyledLogo = styled.div`
  padding: 6px 0;
  width: 170px;
`;

const StyledNav = styled.nav.attrs({
  className: "float-right"
})`
  text-align: center;
  margin: 18px 0px 18px 0;
`;

const StyledNavMenu = styled.ul.attrs({
  className: "mb-0"
})`
  display: inline-flex;
  list-style: outside none none;
`;
const StyledDropMenu = styled.ul`
  display: block;
  border-bottom: 5px solid #09486a;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 150%;
  transition: all 0.5s ease 0s;
  visibility: hidden;
  z-index: 999;
  padding-left: 0px;
  ${StyledNavLink}:hover & {
    top: 100%;
    opacity: 1;
    visibility: visible;
  }
`;

const StyledMenulistItem = styled.li`
  display: inline-block;
  position: relative;
`;
const StyledDropMenulistItem = styled.li`
  display: block;
  width: 250px;
`;

const StyledDropMenuLink = styled(StyledNavLink)`
  background-color: rgba(0, 0, 0, 0.9);
  color: #fff !important;
  padding: 10px;
  text-align: left;
  text-transform: capitalize;
  width: 100%;
  :hover {
    background-color: #09486a;
  }
`;

class Nav extends Component {
  activeMenu = menu => menu === this.props.router.pathname;
  render() {
    return (
      <Fragment>
        <StyledMenuArea>
          <div className="container">
            <div className="row">
              <div className="col-md-2">
                <StyledLogo>
                  <a href="/">
                    <img src="/static/images/logo/yez-logo.svg" alt="" />
                  </a>
                </StyledLogo>
                <div className="responsive-menu-wrap" />
              </div>
              <div className="col-md-10">
                <StyledNav>
                  <StyledNavMenu>
                    {routes.map(route => (
                      <StyledMenulistItem key={route.key}>
                        {route.sub ? (
                          <Fragment>
                            <StyledNavLink
                              href="#"
                              active={this.activeMenu(route.href)}
                            >
                              {route.label}{" "}
                              <i
                                className="fa fa-caret-down"
                                aria-hidden="true"
                              />
                              <StyledDropMenu>
                                {route.sub.map((sub, index) => (
                                  <StyledDropMenulistItem key={index}>
                                    <Link href={sub.href} passHref>
                                      <StyledDropMenuLink>
                                        {sub.label}
                                      </StyledDropMenuLink>
                                    </Link>
                                  </StyledDropMenulistItem>
                                ))}
                              </StyledDropMenu>
                            </StyledNavLink>
                          </Fragment>
                        ) : (
                          <NavLink
                            label={route.label}
                            href={route.href}
                            active={this.activeMenu(route.href)}
                          />
                        )}
                      </StyledMenulistItem>
                    ))}
                  </StyledNavMenu>
                </StyledNav>
              </div>
            </div>
          </div>
        </StyledMenuArea>
        {/* <style jsx>{`
        .fixed-menu {
          z-index: 99 !important;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          transition: 0.5s;
        }
        .responsive-menu-wrap {
          display: none;
        }
         `}</style> */}
      </Fragment>
    );
  }
}

export default withRouter(Nav);

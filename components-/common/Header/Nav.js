import { Component, Fragment } from 'react'
import { withRouter } from 'next/router';
import Link from 'next/link'
// import {Container, Row, Col} from 'reactstrap';

class Nav extends Component {
  activeMenu = (menu) => (menu==this.props.router.pathname ? 'menu-active' : '')
  render() {
    return (<Fragment>
      <div className="menu-area">
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <div className="kttyez-logo">
                {/* <a href="#"><img src="/static/img/yezlogo.png" alt=""/></a> */}
                <a href="#"><img src="/static/images/logo/yez-logo.svg" alt=""/></a>
              </div>
              <div className="responsive-menu-wrap"></div>
            </div>
            <div className="col-md-10">
              <nav className="main-menu float-right">
                <ul className="navigation">
                  <li>
                    <Link href="/">
                      <a className={`${this.activeMenu('/')}`}>home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">
                      <a className={`${this.activeMenu('/about')}`}>about us</a>
                    </Link>
                  </li>
                  <li>
                    <a href="#">Jobs<i className="fa fa-caret-down" aria-hidden="true"></i>
                    </a>
                    <ul className="drop-menu">
                      <li>
                        <a href="#">Job Seekers</a>
                      </li>
                      <li>
                        <a href="#">Employers</a>
                      </li>
                      <li>
                        <a href="#">Job Centers</a>
                      </li>
                      <li>
                        <a href="#">Career Advice</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">entrepreneurship<i className="fa fa-caret-down" aria-hidden="true"></i>
                    </a>
                    <ul className="drop-menu">
                      <li>
                        <a href="#">LOREM IPSUM DOLOR</a>
                      </li>
                      <li>
                        <a href="#">Employers</a>
                      </li>
                      <li>
                        <a href="#">Job Centers</a>
                      </li>
                      <li>
                        <a href="#">Career Advice</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link href="#">
                      <a>News</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Donate</a>
                    </Link>
                  </li>
                </ul>
              </nav>
              {/* <div className="donate-box">
                <a href="/user/login"
                className="donate-btn hvr-shutter-out-horizontal"
                >Donate</a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .kttyez-logo {
          padding: 8px 0;
          width: 170px;
        }
        .menu-area {
            background-color: #fff;
            transition: 0.5s;
          }
          .main-menu {
            text-align: center;
            margin: 18px 0px 18px 0;
          }
          .main-menu ul {
            display: inline-flex;
            list-style: outside none none;
          }
          .main-menu ul li {
            display: inline-block;
            position: relative;
          }
          .main-menu ul li a {
            color: #45403c;
            display: block;
            font-weight: 600;
            padding: 8px 12px;
            text-transform: uppercase;
            transition: all 0.5s ease 0s;
          }
          .main-menu ul li a:active,
          .main-menu ul li a:focus {
            background-color: #09486a;
            color: #fff;
          }
          .main-menu ul li a i.fa {
            margin: 0;
            padding: 0 0 0 5px;
          }
          .main-menu ul li a:hover {
            background-color: #09486a;
            color: #fff;
          }
          ul li a.menu-active {
            background-color: #09486a;
            color: #fff !important;
          }
          .main-menu ul li ul.drop-menu {
            display: block;
            border-bottom: 5px solid #09486a;
            left: 0;
            opacity: 0;
            position: absolute;
            top: 150%;
            transition: all 0.5s ease 0s;
            visibility: hidden;
            z-index: 999;
          }
          .main-menu ul li ul.drop-menu li {
            display: block;
            width: 250px;
          }
          .main-menu ul li ul.drop-menu li a {
            background-color: rgba(0, 0, 0, 0.9);
            color: #fff !important;
            padding: 10px;
            text-align: left;
            text-transform: capitalize;
            width: 100%;
          }
          .main-menu ul li ul li a:hover {
            background-color: #09486a;
          }
          .main-menu ul li ul li a.menu-active {
            font-weight: bold;
            background-color: #09486a;
            color: #fff;
          }
          .main-menu ul li:hover .drop-menu {
            top: 100%;
            opacity: 1;
            visibility: visible;
          }
          .fixed-menu {
            z-index: 99 !important;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            transition: 0.5s;
          }
          .responsive-menu-wrap {
            display: none;
          }
           `}</style>
    </Fragment>)
  }
}

export default withRouter(Nav)

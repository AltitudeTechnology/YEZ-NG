import { Component, Fragment } from 'react'
import Link from 'next/link'
// import {Grid, Container, Row, Col } from 'reactstrap';


export default class TopHeader extends Component{
    render(){
        return(
          <Fragment>
            <div className="top-header-area">
                <div className="container text-right">
                    {/* <Row>
                        <Col md='7'>
                            <div className="top-header-info">
                                <a href="#"><i className="fa fa-phone"></i>11-22-33-44-55</a><span className="seprator">|</span>
                                <a href="mailto:yez@ktt4president.org"><i className="fa fa-envelope"></i>yez@ktt4president.org</a>
                            </div>
                        </Col>
                        <Col md={5} className="text-right">
                            <div className="top-header-info header-right">
                                <a href="#">faq</a><span className="seprator">|</span>
                                <a href="#">contact us</a>
                            </div>
                        </Col>
                    </Row> */}
                    <div className="top-header-info header-right">
                      <Link href="#">
                        <a>Contact us</a>
                      </Link>
                      <span className="seprator">|</span>
                      <Link href="/user/create-account">
                        <a>Create Account</a>
                      </Link>
                      <span className="seprator">|</span>
                      <Link href="/user/login">
                        <a>Login</a>
                      </Link>
                    </div>
                </div>
            </div>
            <style jsx>{`
              .top-header-area {
                  background-color: #2A2E31;
                  color: #fff;
                  padding: 10px 0;
              }

              .top-header-info i.fa {
                  color: #fff;
                  margin-right: 5px;
              }

              .top-header-info a {
                  color: #fff;
              }

              .top-header-info .seprator {
                  padding: 0 5px;
                  color: #fff;
              }

              .header-right {
                  text-transform: uppercase;
                  font-size: 12px;
                  font-weight: 700;
              }
              .header-right a:hover{
                  color: #018491;
              }
            `}</style>
          </Fragment>
        )
    }
}

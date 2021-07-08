import React, {Component, Fragment} from 'react';
import Link from 'next/link'
import { ApolloConsumer } from 'react-apollo'
import cookie from 'cookie'
import redirect from '../../lib/auth/redirect'
import { CandidateDetailsContext } from '../../contexts/CandidateDetailsContext'

export default class LeftNavigation extends Component{
  constructor(props){
    super(props)
    this.setActive = this.setActive.bind(this)
  }

  setActive = (e) => {
    console.log(e.target.className)
  }

    render(){
        return<div>
            <div>
                <CandidateDetailsContext.Consumer>{
                  ({ candidate: { name } }) => <Fragment>
                    <p>
                      {name}
                    </p>
                  </Fragment>
                }</CandidateDetailsContext.Consumer>
                <h4>
                    Candidate
                </h4>
            </div>
            <div className="leftNav">
                <ul>
                    <li className={this.props.activePage=='/' ? "active" : ""} >
                      <Link prefetch href="/user/dashboard">
                          <a>Home </a>
                      </Link>
                    </li>
                    <li className={this.props.activePage=='/payment' ? "active" : ""}>
                        <Link prefetch href="/user/payment">
                          <a>Make Payment  </a>
                        </Link>
                    </li>
                    <li className={this.props.activePage=='/test' ? "active" : ""}>
                        <Link prefetch href="/user/pret-test-code">
                          <a>PRET Test Code </a>
                        </Link>
                    </li>
                    <li className={this.props.activePage=='/upload-cv' ? "active" : ""}>
                        <Link prefetch href="/user/upload-cv">
                        <a>Upload CV</a>
                        </Link>
                    </li>
                    <li className={this.props.activePage=='/schedule-test' ? "active" : ""}>
                        <Link prefetch href="/user/schedule-test">
                        <a>Schedule Test</a>
                        </Link>
                    </li>
                    <li className={this.props.activePage=='/receipt' ? "active" : ""}>
                        <Link prefetch href="/user/receipt">
                        <a>Receipt</a>
                        </Link>
                    </li>
                    <li>
                      <a href="/" target="_blank">
                        Link To Website
                      </a>
                    </li>
                    <li>
                      <ApolloConsumer>{
                        client => <a href="#!" onClick={(e)=>{
                          e.preventDefault();
                          e.stopPropagation();
                          document.cookie = cookie.serialize('token', '', {
                            maxAge: -1, // Expire the cookie immediately
                            path: '/'
                          })
                          document.cookie = cookie.serialize('userType', '', {
                            maxAge: -1, // Expire the cookie immediately\
                            path: '/'
                          })

                          // Force a reload of all the current queries now that the user is
                          // logged in, so we don't accidentally leave any state around.
                          client.cache.reset().then(() => {
                            // Redirect to a more useful page when signed out
                            redirect({}, '/')
                          })
                        }}>
                        Logout </a>
                      }</ApolloConsumer>
                    </li>
                </ul>
            </div>
        </div>
    }
}

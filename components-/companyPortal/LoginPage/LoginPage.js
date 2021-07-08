import {Component} from 'react'
import Link from 'next/link'

import { Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Form } from 'reactstrap';
import { toast } from 'react-toastify';

import { EMAIL_REGEX, TOAST_STYLE } from '../../../utils/common'

class Page extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      displayError: '',
      errorMessage: '',
      passwordValid: null,
      emailValid: null
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  handleEmailChange = (event) => {
    if (EMAIL_REGEX.test(event.target.value)){
      this.setState({emailValid: true});
    } else {
      this.setState({emailValid: null});
    }
    this.setState({email: event.target.value});
  };

  handlePasswordChange = (event) => {
    if (this.state.passwordValid===false)
      this.setState({passwordValid: null});
    this.setState({password: event.target.value});
  };

  doLogin = (e) => {
    //console.log('logging in');
    //console.log(this.state);
    e.preventDefault()
    e.stopPropagation()

    if (this.state.password && this.state.emailValid) {
      this.props.loginCompany({variables: {
        email: this.state.email,
        password: this.state.password
      }})
    } else {
      if (!this.state.email || !this.state.emailValid) {
        this.setState({emailValid: false})
      }
      if (!this.state.password) {
        this.setState({passwordValid: false})
      }
      toast("Your Inputs are not valid", {...TOAST_STYLE.fail});
    }
  }

  render(){
    // console.log(this.props);
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your company account</p>
                    <Form>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input valid={this.state.emailValid} onChange={this.handleEmailChange} type="text" placeholder="Email Address"/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input valid={this.state.passwordValid} onChange={this.handlePasswordChange} type="password" placeholder="Password"/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button type="submit" onClick={this.doLogin} color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Are you new here?</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link href="/company/signUp">
                        <Button color="primary" className="mt-3" active>Sign Up</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Page

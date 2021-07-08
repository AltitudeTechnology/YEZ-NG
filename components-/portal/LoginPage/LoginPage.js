import {Component} from 'react'
import Link from 'next/link'

import { Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Form } from 'reactstrap';
import { toast } from 'react-toastify';

import LoginForm from './LoginForm';

import { PHONE_REGEX, TOAST_STYLE } from '../../../utils/common'

class Page extends Component {
  constructor(props){
    super(props)
    this.state = {
      phone: '',
      password: '',
      displayError: '',
      errorMessage: '',
      passwordValid: null,
      phoneValid: null
    }
  }

  handlePhoneChange = (event) => {
    if (this.state.phoneValid !== null) {
      if (PHONE_REGEX.test(event.target.value)){
        this.setState({phoneValid: true});
      } else {
        this.setState({phoneValid: null});
      }
    }
    this.setState({phone: event.target.value});
  };

  handlePasswordChange = (event) => {
    if (this.state.passwordValid===false)
      this.setState({passwordValid: null});
    this.setState({password: event.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (this.state.password && this.state.phoneValid) {
      this.props.loginCandidate({variables: {
        phone: this.state.phone,
        password: this.state.password
      }})
    } else {
      if (!this.state.phone || !this.state.phoneValid) {
        this.setState({phoneValid: false})
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
                    <p className="text-muted">Sign In to your account</p>
                    <LoginForm />
                    {/* <Form onSubmit={this.handleSubmit}>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          valid={this.state.phoneValid}
                          onChange={this.handlePhoneChange}
                          type="text"
                          placeholder="Phone Number"
                          required={true}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          valid={this.state.passwordValid}
                          onChange={this.handlePasswordChange}
                          type="password"
                          placeholder="Password"
                          required={true}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            type="submit"
                            // onClick={this.doLogin}
                            color="primary"
                            className="px-4"
                          >Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form> */}
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link href="/user/signUp">
                        <Button color="primary" className="mt-3" active>Register Now!</Button>
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

import {Component} from 'react'
import Link from 'next/link'

import { Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Form } from 'reactstrap';
import { toast } from 'react-toastify';

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
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  handleEmailChange = (event) => {
    if (PHONE_REGEX.test(event.target.value)){
      this.setState({phoneValid: true});
    } else {
      this.setState({phoneValid: null});
    }
    this.setState({phone: event.target.value});
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

    if (this.state.password && this.state.phoneValid) {
      this.props.loginCenterManager({variables: {
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
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your Manager account</p>
                    <Form>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Phone Number"
                          valid={this.state.phoneValid}
                          onChange={this.handleEmailChange}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password"
                          valid={this.state.passwordValid}
                          onChange={this.handlePasswordChange}/>
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
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Page

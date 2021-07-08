import {Component} from 'react'
import Link from 'next/link'
import {
  Container, Form, Row, Col,
  Card, CardBody, CardFooter,
  Button, Input, InputGroup,
  InputGroupAddon, InputGroupText,
  Modal, ModalBody, ModalFooter,
  ModalHeader, FormText
} from 'reactstrap';
import { toast } from 'react-toastify';

import { PHONE_REGEX, NOT_PASSWORD_REGEX, TOAST_STYLE, toCamelCase } from '../../../utils/common'

class Page extends Component {
  constructor(props){
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      password: '',
      confirmPassword: '',
      displayError: '',
      errorMessage: '',
      messageType: '',
      showConfirmModal: false,
      passwordValid: null,
      confirmPasswordValid: null,
      phoneValid: null,
      firstNameValid: null,
      lastNameValid: null,
    }

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this)
    this.toggleConfirm = this.toggleConfirm.bind(this)
    this.showConfirmModal = this.showConfirmModal.bind(this)
  }

  handleFieldChange(field, value){
    if (field==='phone'){
      if (PHONE_REGEX.test(value)){
        this.setState({phoneValid: true});
      } else {
        this.setState({phoneValid: false});
      }
    }
    if (field==='firstName' && this.state.firstNameValid===false){
      this.setState({firstNameValid: null});
    }
    if (field==='lastName' && this.state.lastNameValid===false){
      this.setState({lastNameValid: null});
    }
    this.setState({[field]: value});
  }

  handleConfirmPasswordChange = (field, value) => {
    let password = this.state.password;
    let confirmPassword = this.state.confirmPassword;
    if (field==='password') {
      if (!value) {
        this.setState({passwordValid: null})
      } else {
        !NOT_PASSWORD_REGEX.test(value) ?
          this.setState({passwordValid: true}) : this.setState({passwordValid: false})
      }
      //(this.state.passwordValid===false) && this.setState({passwordValid: null});
      this.setState({password: value});
      password = value
    }
    if (field==='confirmPassword') {
      this.setState({confirmPassword: value});
      confirmPassword = value
    }
    if (confirmPassword.length >= password.length && password.length > 0 && confirmPassword.length > 0) {
      if (confirmPassword==password){
        this.setState({
          confirmPasswordValid: true,
          errorMessage: 'match',
        });
      } else {
        this.setState({
          confirmPasswordValid: false,
          errorMessage: 'not a match',
        });
      }
    } else {
      this.setState({
        confirmPasswordValid: (field==='password'&&confirmPassword)? false : null,
        messageType: '',
        errorMessage: '',
      });
    }
  };

  toggleConfirm(){
    this.setState({showConfirmModal: !this.state.showConfirmModal})
  }

  showConfirmModal(){
    if (this.state.passwordValid && this.state.confirmPasswordValid && this.state.phoneValid && this.state.firstName && this.state.lastName) {
      this.setState({firstName: toCamelCase(this.state.firstName), lastName: toCamelCase(this.state.lastName)})
      this.setState({showConfirmModal: true})
    } else {
      if (!this.state.confirmPasswordValid) {
        this.setState({confirmPasswordValid: false})
      }
      if (!this.state.password){
        this.setState({passwordValid: false})
      }
      if (!this.state.phoneValid) {
        this.setState({phoneValid: false})
      }
      if (!this.state.firstName) {
        this.setState({firstNameValid: false})
      }
      if (!this.state.lastName) {
        this.setState({lastNameValid: false})
      }
      toast("Your Inputs are not valid", {...TOAST_STYLE.fail});
    }
  }

  doRegister = (e) => {
    e.preventDefault()
    e.stopPropagation()

    this.props.signUpCandidate({variables: {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phone: this.state.phone,
      password: this.state.password
    }})
  }

  render(){
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Sign Up</h1>
                  <p className="text-muted">Create an account as a <b>User</b></p>
                  <Form>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input valid={this.state.firstNameValid} onChange={(e)=>this.handleFieldChange('firstName', e.target.value)} type="text" placeholder="First Name"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input valid={this.state.lastNameValid} onChange={(e)=>this.handleFieldChange('lastName', e.target.value)} type="text" placeholder="Last Name"/>
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-phone"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input onChange={(e)=>this.handleFieldChange('phone', e.target.value)} type="text" placeholder="E.g: 080XXXXXXXX"
                        valid={this.state.phoneValid}
                      />
                    </InputGroup>
                    <FormText className="mb-3 float-right" style={{fontSize: '10px'}} color="danger"><i>eleven(11) digit phone number</i></FormText>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input valid={this.state.passwordValid} onChange={(e)=>this.handleConfirmPasswordChange('password', e.target.value)} type="password" placeholder="Password"/>
                    </InputGroup>
                    <FormText className="mb-3 float-right" style={{fontSize: '10px'}} color="danger"><i>minimum eight characters, at least one letter and one number</i></FormText>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        onChange={(e)=>this.handleConfirmPasswordChange('confirmPassword', e.target.value)}
                        valid={this.state.confirmPasswordValid}
                        type="password" placeholder="Repeat password"/>
                    </InputGroup>
                    <Button onClick={this.showConfirmModal} color="success" block>Create Account</Button>
                    <Link href='/user/login'>
                      <Button color="link" className="px-0">Already have an account? Login</Button>
                    </Link>
                  </Form>
                </CardBody>
                {/* <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter> */}
              </Card>
            </Col>
          </Row>
          <Modal isOpen={this.state.showConfirmModal} toggle={()=>this.toggleConfirm({})} className='modal-md modal-info' centered={true}>
            <ModalBody className="text-center">
              <p className='display-4 text-primary' style={{fontSize: '1.6rem'}}>Take a second to confirm your details</p>
              <hr />
              <div className='display-4 mb-1' style={{fontSize: '1.9rem'}}>
                <i className="icon-user text-primary"></i> <b>{`${this.state.lastName} ${this.state.firstName}`}</b>
              </div>
              <div className='display-4' style={{fontSize: '1.5rem'}}>
                <i className="icon-phone text-primary"></i> {this.state.phone}
              </div>
              <p className="text-danger" style={{
                margin: '1rem 0px 0px'
              }}>you cannot change these details once your portal has been created</p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.doRegister}>Ok I'm Sure</Button>
              <Button color="danger" onClick={this.toggleConfirm}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    )
  }
}

export default Page

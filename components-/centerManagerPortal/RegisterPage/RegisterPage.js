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

import { EMAIL_REGEX, NOT_PASSWORD_REGEX, TOAST_STYLE, toCamelCase } from '../../../utils/common'

class Page extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      cacRegNo: '',
      email: '',
      password: '',
      confirmPassword: '',
      displayError: '',
      errorMessage: '',
      messageType: '',
      showConfirmModal: false,
      passwordValid: null,
      confirmPasswordValid: null,
      emailValid: null,
      nameValid: null,
      cacRegNoValid: null,
    }

    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this)
    this.toggleConfirm = this.toggleConfirm.bind(this)
    this.showConfirmModal = this.showConfirmModal.bind(this)
  }

  handleFieldChange(field, value){
    if (field==='email'){
      if (EMAIL_REGEX.test(value)){
        this.setState({emailValid: true});
      } else {
        this.setState({emailValid: false});
      }
    }
    if (field==='name' && this.state.nameValid===false){
      this.setState({nameValid: null});
    }
    if (field==='cacRegNo' && this.state.cacRegNoValid===false){
      this.setState({cacRegNoValid: null});
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
    if (this.state.passwordValid && this.state.confirmPasswordValid && this.state.emailValid && this.state.name && this.state.cacRegNo) {
      this.setState({name: toCamelCase(this.state.name), cacRegNo: toCamelCase(this.state.cacRegNo)})
      this.setState({showConfirmModal: true})
    } else {
      if (!this.state.confirmPasswordValid) {
        this.setState({confirmPasswordValid: false})
      }
      if (!this.state.password){
        this.setState({passwordValid: false})
      }
      if (!this.state.emailValid) {
        this.setState({emailValid: false})
      }
      if (!this.state.name) {
        this.setState({nameValid: false})
      }
      if (!this.state.cacRegNo) {
        this.setState({cacRegNoValid: false})
      }
      toast("Your Inputs are not valid", {...TOAST_STYLE.fail});
    }
  }

  doRegister = (e) => {
    e.preventDefault()
    e.stopPropagation()

    console.log(this.state);

    this.props.signUpCompany({variables: {
      name: this.state.name,
      cacRegNo: this.state.cacRegNo,
      email: this.state.email,
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
                  <p className="text-muted">Create a <b>Company</b> account</p>
                  <Form>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-briefcase"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input valid={this.state.nameValid} onChange={(e)=>this.handleFieldChange('name', e.target.value)} type="text" placeholder="Name"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input valid={this.state.cacRegNoValid} onChange={(e)=>this.handleFieldChange('cacRegNo', e.target.value)} type="text" placeholder="CAC Reg No."/>
                    </InputGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-envelope"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input onChange={(e)=>this.handleFieldChange('email', e.target.value)} type="text" placeholder="E.g: user@example.com"
                        valid={this.state.emailValid}
                      />
                    </InputGroup>
                    <FormText className="mb-3 float-right" style={{fontSize: '10px'}} color="danger"><i>valid email address</i></FormText>
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
                    <Link href='/company/login'>
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
          <Modal isOpen={this.state.showConfirmModal} toggle={()=>this.toggleConfirm({})} className='modal-md modal-info' centered>
            <ModalBody className="text-center">
              <p className='display-4 text-primary' style={{fontSize: '1.6rem'}}>Take a second to confirm your details</p>
              <hr />
              <div className='display-4 mb-1' style={{fontSize: '1.9rem'}}>
                <i className="icon-briefcase text-primary"></i> <b>{`${this.state.name}`}</b>
              </div>
              <div className='display-4 mb-1' style={{fontSize: '1.5rem'}}>
                <span className="text-primary">CAC Reg No.:</span> {this.state.cacRegNo}
              </div>
              <div className='display-4' style={{fontSize: '1.5rem'}}>
                <i className="icon-envelope text-primary"></i> {this.state.email}
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

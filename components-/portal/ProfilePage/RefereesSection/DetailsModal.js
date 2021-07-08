import {Component} from 'react'
import {
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import MaskedInput from 'react-text-mask'

import SaveButton from './SaveButton'
import UpdateButton from './UpdateButton'

import {MONTHS, STATES, PAST_YEARS, prettifyState } from '../../../../utils/common'

export default class DetailsModal extends Component{
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: 'Male',
      occupation: '',
      relationship: '',
      details: {}
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState(){
    this.setState({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: 'Male',
      occupation: '',
      relationship: '',
      details: {}
    })
  }

  componentWillReceiveProps(nextProps){
    this.resetState();
    const {referee = {}, isNew} = nextProps;
    if (!isNew && referee._id) {
      if (referee._id) {
        this.setState({
          ...referee,
          id: referee._id || null,
          firstName: referee.name.first || '',
          lastName: referee.name.last || '',
          details: {
            ...referee,
            id: referee._id || null,
            firstName: referee.name.first || '',
            lastName: referee.name.last || ''
          }
        })
      }
    }
  }

  handleFieldChange(field, value){
    this.setState({[field]: value});
    this.updateDetails(field, value);

  }

  updateDetails(field, value){
    const details = this.state;
    delete details.details;
    details[field] = value;
    this.setState({details: this.state});
  }

  render(){
    return(
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className='modal-lg modal-info'>
        <ModalHeader toggle={this.props.toggle}>Add Referee</ModalHeader>
        <Form encType="multipart/form-data" className="form-horizontal">
        <ModalBody>
            <FormGroup row>
              <Col md="6">
                <Label htmlFor="name">First Name</Label>
                <Input onChange={(e)=>this.handleFieldChange('firstName', e.target.value)} defaultValue={this.state.firstName} type="text"  required/>
              </Col>
              <Col md="6">
                <Label htmlFor="name">Last Name</Label>
                <Input onChange={(e)=>this.handleFieldChange('lastName', e.target.value)} defaultValue={this.state.lastName} type="text"  required/>
              </Col>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">Email</Label>
              <Input onChange={(e)=>this.handleFieldChange('email', e.target.value)} defaultValue={this.state.email} type="text" id="name" placeholder="Eg: Google" required/>
            </FormGroup>
            <FormGroup row>
              <Col md="9">
                <Label htmlFor="name">Phone Number</Label>
                <Input onChange={(e)=>this.handleFieldChange('phone', e.target.value)} defaultValue={this.state.phone} type="text" id="name" placeholder="Eg: Google" required/>
              </Col>
              <Col md="3" xs="5">
                <Label htmlFor="name">Gender</Label>
                <Input onChange={(e) => this.handleFieldChange('gender', e.target.value)} type="select" id="name" placeholder="Select Gender" required="required" defaultValue={this.state.gender}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">Occupation</Label>
              <Input onChange={(e)=>this.handleFieldChange('occupation', e.target.value)} defaultValue={this.state.occupation} type="text" id="name" placeholder="Eg: Google" required/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">Relationship</Label>
              <Input onChange={(e)=>this.handleFieldChange('relationship', e.target.value)} defaultValue={this.state.relationship} type="text" id="name" placeholder="Eg: Google" required/>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
          {(this.props.isNew) ? (
            <SaveButton details={this.state.details} close={this.props.toggle}/>
          ) : (
            <UpdateButton details={this.state.details} close={this.props.toggle}/>
          )}{' '}
          <Button tyoe="reset" color="secondary" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
      </Modal>
    )
  }
}

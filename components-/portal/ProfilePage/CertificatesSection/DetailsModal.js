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
      authority: '',
      licenseNumber: '',
      name: '',
      url: '',
      fromMonth: 'January',
      fromYear:  PAST_YEARS[0].toString(),
      toMonth: 'January',
      toYear:  PAST_YEARS[0].toString(),
      doesNotExpire: false,
      details: {}
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.toggleCheck = this.toggleCheck.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState(){
    this.setState({
      id: '',
      authority: '',
      licenseNumber: '',
      name: '',
      url: '',
      fromMonth: 'January',
      fromYear:  PAST_YEARS[0].toString(),
      toMonth: 'January',
      toYear:  PAST_YEARS[0].toString(),
      doesNotExpire: false,
      details: {}
    })
  }

  componentWillReceiveProps(nextProps){
    this.resetState();
    const {certificate = {}, isNew} = nextProps;
    if (!isNew && certificate._id) {
      if (certificate._id) {
        this.setState({
          ...certificate,
          id: certificate._id || null,
          doesNotExpire: certificate.doesNotExpire || false,
          details: {
            ...certificate,
            id: certificate._id || null,
            doesNotExpire: certificate.doesNotExpire || false,
          }
        })
      }
    }
  }

  handleFieldChange(field, value){
    //console.log(this.state);
    //console.log('this.state');
    this.setState({[field]: value});
    this.updateDetails(field, value);

  }
  toggleCheck(){
    //console.log('toggling');
    const _doesNotExpire = !this.state.doesNotExpire;
    this.setState({doesNotExpire: _doesNotExpire})
    this.updateDetails('doesNotExpire', _doesNotExpire);
  }
  updateDetails(field, value){
    const details = this.state;
    delete details.details;
    details[field] = value;
    this.setState({details: this.state});
  }

  render(){
  //this.state.details.id = certificate._id || null;
  const {certificate = {}} = this.props
  // console.log(this.state.details);
    return(
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className='modal-lg modal-info'>
        <ModalHeader toggle={this.props.toggle}>Add Certificates</ModalHeader>
        <Form encType="multipart/form-data" className="form-horizontal">
        <ModalBody>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input onChange={(e)=>this.handleFieldChange('name', e.target.value)} defaultValue={this.state.name} type="text" id="name" placeholder="Eg: Manager" required/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">Certification Authority</Label>
              <Input onChange={(e)=>this.handleFieldChange('authority', e.target.value)} defaultValue={this.state.authority} type="text" id="name" placeholder="Eg: Google" required/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">License Number</Label>
              <Input onChange={(e)=>this.handleFieldChange('licenseNumber', e.target.value)} defaultValue={this.state.licenseNumber} type="text" id="name" placeholder="Eg: Google" required/>
            </FormGroup>
            <FormGroup row>
              <Col md="6">
                <Label htmlFor="name">From</Label>
                <Input onChange={(e)=>this.handleFieldChange('fromMonth', e.target.value)} type="select" id="name" style={{marginBottom: '10px'}} placeholder="Month"  required defaultValue={this.state.fromMonth}>
                  {MONTHS.map((month, i)=><option key={i}>{month}</option>)}
                </Input>
                <Input onChange={(e)=>this.handleFieldChange('fromYear', e.target.value)} type="select" id="name" style={{marginBottom: '10px'}} placeholder="Year"  required defaultValue={this.state.fromYear}>
                  {PAST_YEARS.map((year, i)=><option key={i}>{year}</option>)}
                </Input>
              </Col>
              {(!this.state.doesNotExpire) && (
                <Col md="6">
                  <Label htmlFor="name">To</Label>
                  <Input onChange={(e)=>this.handleFieldChange('toMonth', e.target.value)} type="select" id="name" style={{marginBottom: '10px'}} placeholder="Month"  required defaultValue={this.state.toMonth}>
                    {MONTHS.map((month, i)=><option key={i}>{month}</option>)}
                  </Input>
                  <Input onChange={(e)=>this.handleFieldChange('toYear', e.target.value)} type="select" id="name" style={{marginBottom: '10px'}} placeholder="Year"  required defaultValue={this.state.toYear}>
                    {PAST_YEARS.map((year, i)=><option key={i}>{year}</option>)}
                  </Input>
                </Col>
              )}
            </FormGroup>
            <FormGroup check className="checkbox">
              <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" defaultChecked={this.state.doesNotExpire} onClick={this.toggleCheck}/>
              <Label check className="form-check-label" htmlFor="checkbox1">Does Not Expire</Label>
            </FormGroup>
            <br />
            <FormGroup>
              <Label htmlFor="name">Certification URL</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <b>http://</b>
                  </InputGroupText>
                </InputGroupAddon>
                {/* <Input onChange={(e)=>this.handleFieldChange('salary', e.target.value)} defaultValue={this.state.salary} type="text" id="name" placeholder="Eg: $30 billion for the account" required/> */}
                <Input onChange={(e)=>this.handleFieldChange('url', e.target.value)} defaultValue={this.state.url} type="text" id="name" placeholder="Eg: Google" required/>
              </InputGroup>
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

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

import { PAST_YEARS, YEARS } from '../../../../../utils/common'

export default class DetailsModal extends Component{
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      school: '',
      degree: '',
      field: '',
      grade: '',
      fromYear:  PAST_YEARS[0].toString(),
      toYear: YEARS[0].toString(),
      isSchoolingHere: false,
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
      school: '',
      degree: '',
      field: '',
      grade: '',
      fromYear:  PAST_YEARS[0].toString(),
      toYear: YEARS[0].toString(),
      isSchoolingHere: false,
      details: {}
    })
  }

  componentWillReceiveProps(nextProps){
    this.resetState();
    const {education = {}, isNew} = nextProps;
    if (!isNew && education._id) {
      this.setState({
        ...education,
        id: education._id || null,
        isSchoolingHere: education.isSchoolingHere || false,
        details: {
          ...education,
          id: education._id || null,
          isSchoolingHere: education.isSchoolingHere || false,
        }
      })
    }
  }

  handleFieldChange(field, value){
    this.setState({[field]: value});
    this.updateDetails(field, value);
  }
  toggleCheck(){
    //console.log('toggling');
    const _isSchoolingHere = !this.state.isSchoolingHere;
    this.setState({isSchoolingHere: _isSchoolingHere})
    this.updateDetails('isSchoolingHere', _isSchoolingHere);
  }
  updateDetails(field, value){
    const details = this.state;
    delete details.details;
    details[field] = value;
    this.setState({details: this.state});
  }

  render(){
  //this.state.details.id = education._id || null;
  let {education = {}} = this.props;
  // console.log(YEARS);
  // console.log(this.state.details);
    return(
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className='modal-lg modal-info'>
        <ModalHeader toggle={this.props.toggle}>Education</ModalHeader>
        <Form encType="multipart/form-data" className="form-horizontal">
        <ModalBody>
            <FormGroup>
              <Label htmlFor="name">School</Label>
              <Input onChange={(e)=>this.handleFieldChange('school', e.target.value)} defaultValue={this.state.school} type="text" id="name" placeholder="Eg: Havard Univeristy" required disabled/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">Degree</Label>
              <Input onChange={(e)=>this.handleFieldChange('degree', e.target.value)} defaultValue={this.state.degree} type="text" id="name" placeholder="Eg: Bachelor of Science - BSc" required disabled/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">Field of study</Label>
              <Input onChange={(e)=>this.handleFieldChange('field', e.target.value)} defaultValue={this.state.field} type="text" id="name" placeholder="Eg: Computer Science" required disabled/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">Grade</Label>
              <Input onChange={(e)=>this.handleFieldChange('grade', e.target.value)} defaultValue={this.state.grade} type="text" id="name" placeholder="" required disabled/>
            </FormGroup>
            <FormGroup row>
              <Col md="6">
                <Label htmlFor="name">From Year</Label>
                <Input onChange={(e)=>this.handleFieldChange('fromYear', e.target.value)} type="select" id="name" style={{marginBottom: '10px'}} placeholder="Year"  required disabled defaultValue={this.state.fromYear}>
                  {PAST_YEARS.map((year, i)=><option key={i}>{year}</option>)}
                </Input>
              </Col>
              <Col md="6">
                <Label htmlFor="name">To Year (or expected)</Label>
                <Input onChange={(e)=>this.handleFieldChange('toYear', e.target.value)} type="select" id="name" style={{marginBottom: '10px'}} placeholder="Year"  required disabled defaultValue={this.state.toYear}>
                  {YEARS.map((year, i)=><option key={i}>{year}</option>)}
                </Input>
              </Col>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button tyoe="reset" color="primary" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
      </Modal>
    )
  }
}

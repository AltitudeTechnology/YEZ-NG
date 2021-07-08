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
      role: '',
      companyName: '',
      address: '',
      fromMonth: 'January',
      fromYear:  PAST_YEARS[0].toString(),
      toMonth: 'January',
      toYear:  PAST_YEARS[0].toString(),
      salary: '',
      isWorkingHere: false,
      state: 'Abia',
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
      role: '',
      companyName: '',
      address: '',
      fromMonth: 'January',
      fromYear:  PAST_YEARS[0].toString(),
      toMonth: 'January',
      toYear:  PAST_YEARS[0].toString(),
      salary: '',
      isWorkingHere: false,
      state: 'Abia',
      details: {}
    })
  }

  componentWillReceiveProps(nextProps){
    this.resetState();
    const {experience = {}, isNew} = nextProps;
    if (!isNew && experience._id) {
      if (experience._id) {
        this.setState({
          ...experience,
          id: experience._id || null,
          isWorkingHere: experience.isWorkingHere || false,
          state: prettifyState(experience.state) || 'Abia',
          details: {
            ...experience,
            id: experience._id || null,
            isWorkingHere: experience.isWorkingHere || false,
            state: experience.state || 'Abia',
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
    const _isWorkingHere = !this.state.isWorkingHere;
    this.setState({isWorkingHere: _isWorkingHere})
    this.updateDetails('isWorkingHere', _isWorkingHere);
  }
  updateDetails(field, value){
    const details = this.state;
    delete details.details;
    details[field] = value;
    this.setState({details: this.state});
  }

  render(){
  //this.state.details.id = experience._id || null;
  const {experience = {}} = this.props
  // console.log(this.state.details);
    return(
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className='modal-lg modal-info'>
        <ModalHeader toggle={this.props.toggle}>Add Experience</ModalHeader>
        <Form encType="multipart/form-data" className="form-horizontal">
        <ModalBody>
            <FormGroup>
              <Label htmlFor="name">Role/Position</Label>
              <Input onChange={(e)=>this.handleFieldChange('role', e.target.value)} defaultValue={this.state.role} type="text" id="name" placeholder="Eg: Manager" required/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">Company</Label>
              <Input onChange={(e)=>this.handleFieldChange('companyName', e.target.value)} defaultValue={this.state.companyName} type="text" id="name" placeholder="Eg: Google" required/>
            </FormGroup>
            <FormGroup row>
              <Col md="9" xs="12">
                <Label htmlFor="name">Address</Label>
                <Input onChange={(e)=>this.handleFieldChange('address', e.target.value)} defaultValue={this.state.address} type="text" id="name" placeholder="Eg: Kubwa, Abuja" required/>
              </Col>
              <Col md="3" xs="12">
                <Label htmlFor="name">State</Label>
                <Input onChange={(e)=>this.handleFieldChange('state', prettifyState(e.target.value))} type="select" id="name" placeholder="Select State" required defaultValue={this.state.state}>
                  {STATES.map((state, index)=><option key={index}>{state}</option>)}
                </Input>
              </Col>
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
              {(!this.state.isWorkingHere) && (
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
              <Input className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" defaultChecked={this.state.isWorkingHere} onClick={this.toggleCheck}/>
              <Label check className="form-check-label" htmlFor="checkbox1">Currently working here</Label>
            </FormGroup>
            <br />
            <FormGroup>
              <Label htmlFor="name">Salary (optional)</Label>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ5Ni4yNjIgNDk2LjI2MiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDk2LjI2MiA0OTYuMjYyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTQ3Ny44MzIsMjc0LjI4aC02Ny43NDN2LTY1LjEwNmg2Ny43NDNjMTAuMTc5LDAsMTguNDMtOC4yNDMsMTguNDMtMTguNDI0YzAtMTAuMTgyLTguMjUxLTE4LjQzLTE4LjQzLTE4LjQzaC02Ny43NDMgICBWODEuOTgyYzAtMTMuMTg3LTIuNjA2LTIyLjg2Ni03Ljc0My0yOC43NjJjLTQuODgyLTUuNjA5LTExLjMwMS04LjIxOS0yMC4xOS04LjIxOWMtOC40ODIsMC0xNC42NTksMi41OTItMTkuNDQ3LDguMTY2ICAgYy01LjA3Nyw1LjkwMi03LjY1NCwxNS41OTktNy42NTQsMjguODIxdjkwLjM0M0gyMjcuNjI3bC01NC4xODEtODEuOTg4Yy00LjYzNy03LjMxNy04Ljk5Ny0xNC4xNzEtMTMuMjMxLTIwLjc1ICAgYy0zLjgxMi01LjkyNS03LjUzLTEwLjc0OS0xMS4wNDItMTQuMzUxYy0zLjEwOS0zLjE4OS02LjY1Mi01LjY1Ny0xMC43OTYtNy41NTRjLTMuOTEtMS43ODUtOC44ODEtMi42ODEtMTQuNzYyLTIuNjgxICAgYy03LjUwMSwwLTE0LjMxLDIuMDU1LTIwLjgzLDYuMjc3Yy02LjQ1Miw0LjE3Ni0xMC45MTIsOS4zMzktMTMuNjM2LDE1Ljc4NWMtMi4zOTEsNi4xMjYtMy42NTYsMTUuNTEzLTMuNjU2LDI3LjYzdjc3LjYyNmgtNjcuMDcgICBDOC4yNDYsMTcyLjMyNiwwLDE4MC41NzQsMCwxOTAuNzU1YzAsMTAuMTgxLDguMjQ2LDE4LjQyNCwxOC40MjQsMTguNDI0aDY3LjA3djY1LjExM2gtNjcuMDdDOC4yNDYsMjc0LjI5MiwwLDI4Mi41MzgsMCwyOTIuNzIyICAgQzAsMzAyLjksOC4yNDYsMzExLjE0LDE4LjQyNCwzMTEuMTRoNjcuMDd2MTAzLjE0M2MwLDEyLjc5NywyLjY4OSwyMi4zNzgsOC4wMTUsMjguNDY2YzUuMDY1LDUuODA1LDExLjQ4Nyw4LjUsMjAuMjA4LDguNSAgIGM4LjQxNCwwLDE0Ljc4Ni0yLjcwNywyMC4wNy04LjUyM2M1LjQxMS01Ljk1OCw4LjE0OC0xNS41MzMsOC4xNDgtMjguNDQyVjMxMS4xNGgxMTUuMzA4bDYyLjM5OSw5NS42ODMgICBjNC4zMzksNi4zMjUsOC44MTksMTIuNzA5LDEzLjI4NywxOC45NjljNC4wMzEsNS42MjEsOC40MjksMTAuNTc0LDEzLjA2OSwxNC43MTFjNC4xNzksMy43NDIsOC42NTksNi40ODQsMTMuMzE2LDguMTU3ICAgYzQuNzk0LDEuNzI2LDEwLjM5NywyLjYwMSwxNi42MTUsMi42MDFjMTYuODc1LDAsMzQuMTU4LTUuMTY2LDM0LjE1OC00My40NzlWMzExLjE0aDY3Ljc0M2MxMC4xNzksMCwxOC40My04LjI1MiwxOC40My0xOC40MyAgIEM0OTYuMjYyLDI4Mi41MzIsNDg4LjAxMSwyNzQuMjgsNDc3LjgzMiwyNzQuMjh6IE0zNTUuMDU0LDIwOS4xNzN2NjUuMTA2aC02MC4wNDFsLTQzLjAyMS02NS4xMDZIMzU1LjA1NHogTTE0MS45MzYsMTM0LjM2NCAgIGwyNC43NiwzNy45NTZoLTI0Ljc2VjEzNC4zNjR6IE0xNDEuOTM2LDI3NC4yOHYtNjUuMTA2aDQ4LjgwMmw0Mi40NjYsNjUuMTA2SDE0MS45MzZ6IE0zNTUuMDU0LDM2NS4xNTNsLTM1LjY4My01NC4wMTNoMzUuNjgzICAgVjM2NS4xNTN6IiBmaWxsPSIjM2U1MTViIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input onChange={(e)=>this.handleFieldChange('salary', e.target.value)} defaultValue={this.state.salary} type="text" id="name" placeholder="Eg: $30 billion for the account" required/>
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

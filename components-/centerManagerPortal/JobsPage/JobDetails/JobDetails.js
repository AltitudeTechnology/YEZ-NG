import {Component} from 'react'
import Router from 'next/router'
import { Mutation, Query } from 'react-apollo'
import {
  Card,
  CardBody,
  Button,
  CardTitle,
  CardFooter,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import Select from 'react-select'
import { toast } from 'react-toastify'

const employmentTypeOptions = [
	{ value: 'fullTime', label: 'Full-time' },
	{ value: 'partTime', label: 'Part-time' },
	{ value: 'contract', label: 'Contract' },
	{ value: 'temporary', label: 'Temporary' },
	{ value: 'volunteer', label: 'Volunteer' },
	{ value: 'internship', label: 'Internship' },
]
import {
  MONTHS, STATES, STAFF_SIZES, PHONE_REGEX, TOAST_STYLE, EMAIL_REGEX,
   prettifyState, enumifyState, formatDate
 } from '../../../../utils/common'
import { ADD_COMPANY_JOB_MUTATION, UPDATE_COMPANY_JOB_MUTATION } from '../../../../lib/backendApi/mutations'
import {PROFILE_INDUSTRY_MANY_QUERY} from '../../../../lib/backendApi/queries'

import DeleteButton from './DeleteButton'

class ProfileSection extends Component {
  constructor(props) {
    super(props)
    const {job = {}, company={}} = this.props;
    const stateOfResidence = prettifyState(job.state) || prettifyState(company.stateOfResidence);
    this.state = {
      role: job.role || '',
      state: stateOfResidence || '',
      contactPhone: job.contactPhone || company.phone || '',
      contactEmail: job.contactEmail || company.email || '',
      contactName: job.contactName || '',
      salary: job.salary || '',
      employmentType: job.employmentType || '',
      expiryDate: formatDate(job.expiryDate) || '',
      basicDescription: job.basicDescription || '',
      fullDescription: job.fullDescription || '',
      industries: job.industries || company.industries || [],
      //Validation
      roleValid: null,
      // addressValid: null,
      stateValid: null,
      contactPhoneValid: null,
      contactEmailValid: null,
      contactNameValid: null,
      industriesValid: null,
      employmentTypeValid: null,
      expiryDateValid: null,
      basicDescriptionValid: null,
      //
      selectedjob: {}
    }
    this.doUpdate = this.doUpdate.bind(this);
    this.onCompleted = this.onCompleted.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.toggleConfirm = this.toggleConfirm.bind(this);
  }

  toggleConfirm(job){
    // console.log(job);
    if (job._id) {
      this.setState({selectedjob: job});
    }
    this.setState({showConfirmModal: !this.state.showConfirmModal});
  }

  handleEmailChange = (event) => {
    if (EMAIL_REGEX.test(String(event.target.value).toLowerCase())){
      this.setState({email: event.target.value, contactEmailValid: true});
    } else {
      this.setState({contactEmailValid: null});
    }
  }

  handlePhoneChange = (event) => {
    if (PHONE_REGEX.test(String(event.target.value).toLowerCase())){
      this.setState({phone: event.target.value, contactPhoneValid: true});
    } else {
      this.setState({contactPhoneValid: null});
    }
  }

  handleFieldChange(field, value){
    const newState = {[field]: value}
    if (field==='role' && this.state.roleValid===false){
      newState.roleValid = null;
    }
    if (field==='address' && this.state.addressValid===false){
      newState.addressValid = null;
    }
    if (field==='state' && this.state.stateValid===false){
      newState.stateValid = null;
    }
    if (field==='expiryDate' && this.state.expiryDateValid===false){
      newState.expiryDateValid = null;
    }
    if (field==='contactName' && this.state.contactNameValid===false){
      newState.contactNameValid = null;
    }
    if (field==='basicDescription' && this.state.basicDescriptionValid===false){
      newState.basicDescriptionValid = null;
    }
    this.setState(newState);
    // this.updateDetails(field, value);
  }



  doUpdate = (e, runMutation) => {
    e.preventDefault()
    e.stopPropagation()
    // console.log(this.state);
    const data = this.state;

    if (data.role && data.expiryDate && data.state &&
        data.contactPhone && data.contactEmail && data.contactName &&
        data.industries.length>0 && data.employmentType && data.basicDescription
      ) {
        const variables = {
          role: data.role,
          state: enumifyState(this.state.state) || 'Abia',
          contactPhone: data.contactPhone,
          contactEmail: data.contactEmail,
          contactName: data.contactName,
          salary: data.salary,
          industries: data.industries,
          employmentType: data.employmentType || 'fullTime',
          expiryDate: data.expiryDate,
          basicDescription: data.basicDescription,
          fullDescription: data.fullDescription
        }
        if (this.props.job){
          this.props.job._id && (variables.id = this.props.job._id);
        }
      runMutation({ variables })
    } else {
      const newState = {};
      !data.role && (newState.roleValid = false);
      !data.state && (newState.stateValid = false);
      !data.contactPhone && (newState.contactPhoneValid = false);
      !data.contactEmail && (newState.contactEmailValid = false);
      !data.contactName && (newState.contactNameValid = false);
      data.industries.length==0 && (newState.industriesValid = false);
      !data.employmentType && (newState.employmentTypeValid = false);
      !data.expiryDate && (newState.expiryDateValid = false);
      !data.basicDescription && (newState.basicDescriptionValid = false);
      this.setState(newState);
      toast("Please Validate your inputs", {...TOAST_STYLE.fail});
    }
  }

  onCompleted = ({ addJob: {record}}) => {
    toast(`Your ${record.role} job has been created`, {...TOAST_STYLE.success});
    Router.push(`/company/job?id=${record._id}`, `/company/job/${record._id}`)
  }

  onError = (error) => {
    console.log(error);
    if (error.graphQLErrors.length==0)
      toast("Something Went Wrong With your request", {...TOAST_STYLE.fail});

    error.graphQLErrors.forEach(error=>{
      switch(error.message) {
        case `Invalid Phone Number`:
        toast("Invalid Phone number", {...TOAST_STYLE.fail});
        break;
        case `E11000 duplicate key error collection: ktt-backend.companys index: jobrole_1 dup key: { : "${this.state.jobrole}" }`:
        toast("This Userrole is taken", {...TOAST_STYLE.fail});
        break;
        case `E11000 duplicate key error collection: ktt-backend.companys index: email_1 dup key: { : "${this.state.email}" }`:
        toast("This Email is taken", {...TOAST_STYLE.fail});
        break;
        default:
        toast("Something Went Wrong", {...TOAST_STYLE.fail});
      }
    })
  }
  onUpdateCompleted = ({ updateJob: {record}}) => {
    toast(`Your ${record.role} job has been updated`, {...TOAST_STYLE.success});
    Router.push(`/company/job?id=${record._id}`, `/company/job/${record._id}`)
  }

  onUpdateError = (error) => {
    console.log(error);
    if (error.graphQLErrors.length==0)
      toast("Something Went Wrong With your request", {...TOAST_STYLE.fail});

    error.graphQLErrors.forEach(error=>{
      switch(error.message) {
        case `Invalid Phone Number`:
        toast("Invalid Phone number", {...TOAST_STYLE.fail});
        break;
        case `E11000 duplicate key error collection: ktt-backend.companys index: jobrole_1 dup key: { : "${this.state.jobrole}" }`:
        toast("This Userrole is taken", {...TOAST_STYLE.fail});
        break;
        case `E11000 duplicate key error collection: ktt-backend.companys index: email_1 dup key: { : "${this.state.email}" }`:
        toast("This Email is taken", {...TOAST_STYLE.fail});
        break;
        default:
        toast("Something Went Wrong", {...TOAST_STYLE.fail});
      }
    })
  }

  render() {
    return (
      <Form action="" encType="multipart/form-data" className="form-horizontal">
        <Card>
          <CardBody>
            <Row>
              <Col>
                <CardTitle className="mb-0">
                  {(this.props.noedit) && (<div className="float-right">
                    <Button  size="sm" color="primary" onClick={()=>Router.push('/company/job/create')}>
                      <i className="icon-plus"></i> Create
                    </Button>
                    {' '}
                    <Button className="btn-sm" outline color="primary"
                      onClick={()=>Router.push(
                        `/company/job/edit?id=${this.props.job._id}`,
                        `/company/job/${this.props.job._id}/edit`
                      )}>
                      <i className="icon-pencil"></i>&nbsp; Edit
                    </Button>
                    {' '}
                    <Button className="btn-sm" outline color="danger"
                      onClick={()=>this.toggleConfirm(this.props.job)}>
                      <i className="icon-trash"></i>
                    </Button>
                  </div>)}
                  {(this.props.isedit) && (<div className="float-right">
                    <Button  size="sm" color="primary" onClick={()=>Router.push('/company/job/create')}>
                      <i className="icon-plus"></i> Create
                    </Button>
                    {' '}
                    <Button className="btn-sm" outline color="danger"
                      onClick={()=>this.toggleConfirm(this.props.job)}>
                      <i className="icon-trash"></i>
                    </Button>
                  </div>)}
                  {(this.props.noedit)? `View` : ((this.props.isNew) ? `Add` : `Edit`)}
                  {' '}Job Details
                </CardTitle>
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col sm="12">
                <FormGroup>
                  <Label>Role/Position</Label>
                  <Input  type="text" placeholder="Name" required
                    disabled = {this.props.noedit && true}
                    valid={this.state.roleValid}
                    onChange={(e)=>this.handleFieldChange('role', e.target.value)}
                    defaultValue={this.state.role}/>
                </FormGroup>
                <FormGroup row>
                  <Col md="4" xs="12">
                    <Label>State</Label>
                    <Input type="select" placeholder="Select State"
                      disabled = {this.props.noedit && true}
                      valid={this.state.stateValid}
                      onChange={(e) => this.handleFieldChange('state', e.target.value)} >
                      <option>Select a state</option>
                      {STATES.map((state, index) =>(<option
                        key={index}
                        selected={this.state.state==state}> {
                          state
                        }</option>))}
                    </Input>
                  </Col>
                  <Col md="4">
                    <Label htmlFor="name">Expiry Date</Label>
                    <Input type="date" id="name" placeholder="Expiry date" required="required"
                      disabled = {this.props.noedit && true}
                      valid={this.state.expiryDateValid}
                      onChange={(e) => this.handleFieldChange('expiryDate', e.target.value)}
                      defaultValue={this.state.expiryDate}/>
                  </Col>
                  <Col md="4">
                    <Label>Salary Range</Label>
                    <Input type="text" placeholder="Eg: 10,000 - 10,000,000,000" required
                      disabled = {this.props.noedit && true}
                      onChange={(e)=>this.handleFieldChange('salary', e.target.value)}
                      defaultValue={this.state.salary}/>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="6" xs="12">
                    <Label htmlFor="name">Industries</Label>
                    <Query query={PROFILE_INDUSTRY_MANY_QUERY}>
                      {({loading, error, data}) => {
                        if (loading)
                          return "Loading...";
                        if (error)
                          return `Error! ${error.message}`;

                        const { industryMany } = data;
                        const industryOptions = industryMany.map(industry=>({value: industry._id, label: industry.name}));
                        const defaultValues = [];
                        industryOptions.forEach(opt=>this.state.industries.find(ind=>ind==opt.value) && defaultValues.push(opt))
                        return (
                          <Select
                            isDisabled = {this.props.noedit && true}
                            isMulti
                            options={industryOptions}
                            onChange={opts=>this.setState({
                              industries: opts.map(opt=>opt.value),
                              industriesValid: null
                            })}
                            defaultValue={defaultValues}
                          />
                        )
                      }}
                    </Query>
                    {(this.state.industriesValid == false) && <FormText className="mb-3" style={{fontSize: '12px'}} color="danger"><i>select at least one industry</i></FormText>}
                  </Col>
                  <Col md="6" xs="12">
                    <Label>Employment type</Label>
                    <Select
                      isDisabled = {this.props.noedit && true}
                      options={employmentTypeOptions}
                      onChange={(opt)=>this.setState({
                        employmentType: opt.value,
                        employmentTypeValid: null
                      })}
                      defaultValue={employmentTypeOptions.find(opt=>opt.value==this.state.employmentType)}
                    />
                    {(this.state.employmentTypeValid == false) && <FormText className="mb-3" style={{fontSize: '12px'}} color="danger"><i>select an employment type</i></FormText>}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="4">
                    <Label>Contact Phone</Label>
                    <Input type="text" placeholder="Phone number" required
                      disabled = {this.props.noedit && true}
                      valid={this.state.contactPhoneValid}
                      defaultValue={this.state.contactPhone}
                      onChange={this.handlePhoneChange}/>
                    </Col>
                    <Col md="4">
                      <Label>Contact Email</Label>
                      <Input type="email" placeholder="Email address"
                        disabled = {this.props.noedit && true}
                        valid={this.state.contactEmailValid}
                        defaultValue={this.state.contactEmail}
                        onChange={this.handleEmailChange}/>
                      </Col>
                      <Col md="4">
                        <Label>Contact Name</Label>
                        <Input type="text" placeholder="Contact name" required
                          disabled = {this.props.noedit && true}
                          valid={this.state.contactNameValid}
                          onChange={(e)=>this.handleFieldChange('contactName', e.target.value)}
                          defaultValue={this.state.contactName}/>
                        </Col>
                </FormGroup>
                <FormGroup>
                  <Label>Basic description</Label>
                  <Input type="textarea" name="textarea-input" id="textarea-input" rows="3"
                    disabled = {this.props.noedit && true}
                    placeholder="Short description of the role to be displayed in listings"
                    valid={this.state.basicDescriptionValid}
                    onChange={(e)=>this.handleFieldChange('basicDescription', e.target.value)}
                    value={this.state.basicDescription}/>
                </FormGroup>
                <FormGroup>
                  <Label>Full Job description</Label>
                  <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                    disabled = {this.props.noedit && true}
                    placeholder="Describe the role, and help applicants learn what makes it a great opportunity."
                    onChange={(e)=>this.handleFieldChange('fullDescription', e.target.value)}
                    value={this.state.fullDescription}/>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
          {(!this.props.noedit) && (<CardFooter>
            {(this.props.isNew) ? (
              <Mutation mutation={ADD_COMPANY_JOB_MUTATION} onCompleted={this.onCompleted} onError={this.onError}>
                {(addJob, {data, error}) => (
                  <Button className="float-right" type="submit" size="sm" color="primary"
                    onClick={e=>this.doUpdate(e, addJob)}>
                    <i className="fa fa-dot-circle-o"></i>
                    Create Job
                  </Button>
                )}
              </Mutation>
            ) : (
              <Mutation mutation={UPDATE_COMPANY_JOB_MUTATION} onCompleted={this.onUpdateCompleted} onError={this.onUpdateError}>
                {(updateJob, {data, error}) => (
                  <Button className="float-right" type="submit" size="sm" color="primary"
                    onClick={e=>this.doUpdate(e, updateJob)}>
                    <i className="fa fa-dot-circle-o"></i>
                    Update Job
                  </Button>
                )}
              </Mutation>
            )}
          </CardFooter>)}
          <Modal isOpen={this.state.showConfirmModal} toggle={()=>this.toggleConfirm({})} className='modal-md modal-danger' centered>
            <ModalBody className="text-center">
              <p className={'display-4 text-danger'} style={{fontSize: '1.9rem'}}>Are you sure you want to delete this <b className="text-dark">{this.state.role}</b> job?</p>
            </ModalBody>
            <ModalFooter>
              <DeleteButton details={{id: this.state.selectedjob._id}} toggleConfirm={()=>this.toggleConfirm({})}/>
              <Button color="secondary" onClick={this.toggleConfirm}>No thanks</Button>
            </ModalFooter>
          </Modal>
        </Card>
      </Form>
    )
  }
}

export default ProfileSection

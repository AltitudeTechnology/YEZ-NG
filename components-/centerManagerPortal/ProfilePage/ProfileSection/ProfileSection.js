import {Component} from 'react'
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
  InputGroupText
} from 'reactstrap'
import Select from 'react-select'
import { toast } from 'react-toastify'

const staffOptions = [
	{ value: "a", label: '0 - 1' },
	{ value: "b", label: '2 - 10' },
	{ value: "c", label: '11 - 50' },
	{ value: "d", label: '51 - 200' },
	{ value: "e", label: '201 - 500' },
	{ value: "f", label: '501 - 1000' },
	{ value: "g", label: '1,001 - 5,000' },
	{ value: "h", label: '5,001 - 10,000' },
	{ value: "i", label: '10,000+' },
]
import {
  MONTHS, STATES, STAFF_SIZES, PAST_YEARS, TOAST_STYLE, EMAIL_REGEX,
   prettifyState, enumifyState, formatDate
 } from '../../../../utils/common'
import { UPDATE_COMPANY_MUTATION } from '../../../../lib/backendApi/mutations'
import {PROFILE_INDUSTRY_MANY_QUERY} from '../../../../lib/backendApi/queries'

class ProfileSection extends Component {
  constructor(props) {
    super(props)
    // const staffSize = STAFF_SIZES[props.user.staffSize.charCodeAt(0) - 97];
    const stateOfResidence = prettifyState(props.user.stateOfResidence);
    this.state = {
      name: props.user.name || '',
      phone: props.user.phone || '',
      email: props.user.email || '',
      cacRegNo: props.user.cacRegNo || '',
      address: props.user.address || '',
      website: props.user.website || '',
      yearFounded: props.user.yearFounded || 2018,
      staffSize: props.user.staffSize || 'a',
      stateOfResidence: stateOfResidence,
      industry: props.user.industry || '',
      industries: props.user.industries || '',
    }
    this.doUpdate = this.doUpdate.bind(this);
    this.onCompleted = this.onCompleted.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }

  handleEmailChange = (event) => {
    if (EMAIL_REGEX.test(String(event.target.value).toLowerCase())){
      this.setState({email: event.target.value, emailValid: true});
    } else {
      this.setState({emailValid: false});
    }
  };

  handleFieldChange(field, value){
    this.setState({[field]: value});
    // this.updateDetails(field, value);
  }



  doUpdate = (e, runMutation) => {
    e.preventDefault()
    e.stopPropagation()
    // console.log(this.state);

    if (this.state.phone && this.state.address){
      runMutation({ variables: {
        id: this.props.user._id,
        phone: this.state.phone || '',
        address: this.state.address || '',
        stateOfResidence: enumifyState(this.state.stateOfResidence) || 'Abia',
        website: this.state.website || '',
        staffSize: this.state.staffSize || 'a',
        yearFounded: this.state.yearFounded,
        // industry: this.state.industry || '',
        industries: this.state.industries || '',
      }})
    } else {
      toast("Please Validate your inputs", {...TOAST_STYLE.fail});
    }
  }

  onCompleted = (data) => {
    toast("Your Company Details have been updated", {...TOAST_STYLE.success});
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
        case `E11000 duplicate key error collection: ktt-backend.companys index: username_1 dup key: { : "${this.state.username}" }`:
        toast("This Username is taken", {...TOAST_STYLE.fail});
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
    const { user = {} } = this.props;
    return (
      <Form action="" encType="multipart/form-data" className="form-horizontal">
        <Mutation mutation={UPDATE_COMPANY_MUTATION} onCompleted={this.onCompleted} onError={this.onError}>
          {(companyUpdateById, {data, error}) => (
              <Card>
                <CardBody >
                  <Row>
                    <Col sm="5">
                      <CardTitle className="mb-0">Edit Profile</CardTitle>
                    </Col>
                  </Row>
                  <hr/>
                  <Row>
                    <Col sm="12">
                      <FormGroup>
                        <Label htmlFor="name">Company Name</Label>
                        <Input onChange={(e)=>this.handleFieldChange('name', e.target.value)} type="text" id="name" disabled placeholder="Name" required value={this.state.name}/>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="5">
                          <Label htmlFor="name">Phone</Label>
                          <Input onChange={(e)=>this.handleFieldChange('phone', e.target.value)} type="text" id="name" placeholder="Phone number" required value={this.state.phone}/>
                        </Col>
                        <Col md="4">
                          <Label htmlFor="name">CAC Registration Number</Label>
                          <Input type="text" disabled id="name" placeholder="CAC number" required value={this.state.cacRegNo}/>
                        </Col>
                        <Col md="3">
                          <Label htmlFor="name">Year Founded</Label>
                          <Input onChange={(e)=>this.handleFieldChange('yearFounded', e.target.value)} type="number" id="name" placeholder="Year Founded" required value={this.state.yearFounded}/>
                        </Col>
                      </FormGroup>
                      <FormGroup>
                          <Label htmlFor="name">Email</Label>
                          <Input disabled type="email" id="name" placeholder="Email address" required defaultValue={this.state.email} onChange={this.handleEmailChange}/>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="9" xs="12">
                          <Label htmlFor="name">Address</Label>
                          <Input valid={(
                              this.state.address)
                              ? null
                              : false} onChange={(e) => this.handleFieldChange('address', e.target.value)} type="text" id="name" placeholder="Office address" required="required" defaultValue={this.state.address}/>
                        </Col>
                        <Col md="3" xs="12">
                          <Label htmlFor="name">State of Residence</Label>
                          <Input onChange={(e) => this.handleFieldChange('stateOfResidence', e.target.value)} type="select" id="name" placeholder="Select State">
                            <option>Select a state</option>
                            {STATES.map((state, index) =>(<option
                              key={index}
                              selected={this.state.stateOfResidence==state}> {
                                state
                              }</option>))}
                          </Input>
                        </Col>
                      </FormGroup>

                      <FormGroup row>
                        <Col md="12" xs="12">
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
                                  isMulti
                                  options={industryOptions}
                                  onChange={opts=>this.setState({industries: opts.map(opt=>opt.value)})}
                                  defaultValue={defaultValues}
                                />
                              )
                            }}
                          </Query>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="6" xs="12">
                          <Label htmlFor="name">Website URL</Label>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <b>http://</b>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input onChange={(e)=>this.handleFieldChange('website', e.target.value)} defaultValue={this.state.website} type="text" id="name" placeholder="Eg: google.com" required/>
                          </InputGroup>
                        </Col>
                        <Col md="6" xs="12">
                          <Label htmlFor="name">Staff Size</Label>
                          <Select
                            menuPlacement = "auto"
                            options={staffOptions}
                            onChange={(opt)=>this.setState({staffSize: opt.value})}
                            defaultValue={staffOptions.find(opt=>opt.value==this.state.staffSize)}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup>

                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button onClick={e=>this.doUpdate(e, companyUpdateById)} className="float-right" type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i>
                    Update Profile</Button>
                </CardFooter>
              </Card>
            )}
        </Mutation>
      </Form>
    )
  }
}

export default ProfileSection

import {Component} from 'react'
import {Mutation} from 'react-apollo'
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
  Input
} from 'reactstrap'
import {toast} from 'react-toastify';

import {MONTHS, STATES, PAST_YEARS, TOAST_STYLE, prettifyState, enumifyState, formatDate} from '../../../../utils/common'
import {UPDATE_CANDIDATE_MUTATION} from '../../../../lib/backendApi/mutations'

class MoreDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: props.user.address || '',
      nationality: props.user.nationality || '',
      gender: props.user.gender || '',
      origin: props.user.stateOfOrigin || '',
      stateOfResidence: prettifyState(props.user.stateOfResidence) || '',
      dob: formatDate(props.user.dateOfBirth),
      pob: props.user.placeOfBirth || ''
      //bvn: props.user.bvn || '',
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.doUpdate = this.doUpdate.bind(this)
    this.onCompleted = this.onCompleted.bind(this)
  }

  doUpdate = (e, runMutation) => {
    //console.log(this.state);
    e.preventDefault()
    e.stopPropagation()

    // if (this.state.emailValid){
    runMutation({
      variables: {
        id: this.props.user._id,
        address: this.state.address,
        //bvn: this.state.bvn,
        nationality: this.state.nationality,
        stateOfOrigin: this.state.origin,
        dateOfBirth: this.state.dob,
        placeOfBirth: this.state.pob,
        gender: this.state.gender || 'Male',
        stateOfResidence: this.state.stateOfResidence
          ? enumifyState(this.state.stateOfResidence)
          : 'Abia'
      }
    })
    // } else {
    //   toast("Not succesful: Please Validate your inputs", {...TOAST_STYLE.fail});
    // }
  }

  onCompleted = data => toast("Your Profile Details have been updated", {...TOAST_STYLE.success});

  onError = error => console.log(error);

  handleFieldChange(field, value) {
    this.setState({[field]: value});
  }

  render() {
    const user = this.props.user || {};
    return (<Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
      <Mutation mutation={UPDATE_CANDIDATE_MUTATION} onCompleted={this.onCompleted} onError={this.onError}>
        {(candidateUpdateById, {data, error}) => (
          <Card>
            <CardBody >
              <Row>
                <Col sm="5">
                  <CardTitle className="mb-0">Edit Additional Details</CardTitle>
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col sm="12">
                  <FormGroup>
                    <Label htmlFor="name">Address</Label>
                    <Input valid={(
                        this.state.address)
                        ? null
                        : false} onChange={(e) => this.handleFieldChange('address', e.target.value)} type="text" id="name" placeholder="House address" required="required" defaultValue={this.state.address}/>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4" xs="7">
                      <Label htmlFor="name">State of Residence</Label>
                      <Input onChange={(e) => this.handleFieldChange('stateOfResidence', e.target.value)} type="select" id="name" placeholder="Select State" required="required" defaultValue={this.state.stateOfResidence}>
                        {
                          STATES.map((state, index) =>< option key = {
                            index
                          } > {
                            state
                          }</option>)
                        }
                      </Input>
                    </Col>
                    <Col md="3" xs="5">
                      <Label htmlFor="name">Gender</Label>
                      <Input onChange={(e) => this.handleFieldChange('gender', e.target.value)} type="select" id="name" placeholder="Select Gender" required="required" defaultValue={this.state.gender}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </Input>
                    </Col>
                    <Col md="5" xs="12">
                      <Label htmlFor="name">Nationality</Label>
                      <Input valid={(
                          this.state.nationality)
                          ? null
                          : false} onChange={(e) => this.handleFieldChange('nationality', e.target.value)} type="text" id="name" placeholder="Nationality" required="required" defaultValue={this.state.nationality}/>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="6" xs="12">
                      <Label htmlFor="name">Date of Birth</Label>
                      <Input valid={(
                          this.state.dob)
                          ? null
                          : false} onChange={(e) => this.handleFieldChange('dob', e.target.value)} type="date" id="name" placeholder="Date of Birth" required="required" defaultValue={this.state.dob}/>
                    </Col>
                    <Col md="6" xs="12">
                      <Label htmlFor="name">Place of Birth</Label>
                      <Input valid={(
                          this.state.pob)
                          ? null
                          : false} onChange={(e) => this.handleFieldChange('pob', e.target.value)} type="text" id="name" placeholder="Place of Birth" required="required" defaultValue={this.state.pob}/>
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <Button onClick={e => this.doUpdate(e, candidateUpdateById)} className="float-right" type="submit" size="sm" color="primary">
                <i className="fa fa-dot-circle-o"></i>
                Update Details</Button>
            </CardFooter>
          </Card>
        )}
      </Mutation>
    </Form>)
  }
}

export default MoreDetails

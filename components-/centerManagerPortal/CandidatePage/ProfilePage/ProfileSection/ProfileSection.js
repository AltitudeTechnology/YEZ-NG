import {Component} from 'react'
import { Mutation } from 'react-apollo'
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
import { toast } from 'react-toastify'

import { EMAIL_REGEX, TOAST_STYLE } from '../../../../utils/common'
import { UPDATE_CANDIDATE_MUTATION } from '../../../../lib/backendApi/mutations'


class ProfileSection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: props.user.email || '',
      username: props.user.username || '',
      emailValid: EMAIL_REGEX.test(String(props.user.email).toLowerCase()),
    }
    this.doUpdate = this.doUpdate.bind(this)
    this.onCompleted = this.onCompleted.bind(this)
  }

  handleEmailChange = (event) => {
    if (EMAIL_REGEX.test(String(event.target.value).toLowerCase())){
      this.setState({email: event.target.value, emailValid: true});
    } else {
      this.setState({emailValid: false});
    }
  };

  handleUsernameChange = (event) => {
    const newState = {
      username: event.target.value
    };
    // if (this.state.displayError) {
    //   newState.displayError = false
    // }
    this.setState(newState);
  };

  doUpdate = (e, runMutation) => {
    //console.log(this.state);
    e.preventDefault()
    e.stopPropagation()

    if (this.state.emailValid){
      runMutation({ variables: {
        id: this.props.user._id,
        email: this.state.email,
        username: this.state.username
      }})
    } else {
      toast("Not succesful: Please Validate your inputs", {...TOAST_STYLE.fail});
    }
  }

  onCompleted = (data) => {
    toast("Your Profile Details have been updated", {...TOAST_STYLE.success});
  }

  onError = (error) => {
    console.log(error);
    if (error.graphQLErrors.length==0)
      toast("Something Went Wrong With your request", {...TOAST_STYLE.fail});

    error.graphQLErrors.forEach(error=>{
      switch(error.message) {
        case `E11000 duplicate key error collection: ktt-backend.candidates index: username_1 dup key: { : "${this.state.username}" }`:
        toast("This Username is taken", {...TOAST_STYLE.fail});
        break;
        case `E11000 duplicate key error collection: ktt-backend.candidates index: email_1 dup key: { : "${this.state.email}" }`:
        toast("This Email is taken", {...TOAST_STYLE.fail});
        break;
        default:
        toast("Something Went Wrong", {...TOAST_STYLE.fail});
      }
    })
  }

  render() {
    // console.log('this.propsopo');
    // console.log(this.props);

    const user = this.props.user || {};

    return (
      <Form action="" encType="multipart/form-data" className="form-horizontal">
        <Mutation mutation={UPDATE_CANDIDATE_MUTATION} onCompleted={this.onCompleted} onError={this.onError}>
          {(candidateUpdateById, {data, error}) => (
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
                      <FormGroup row>
                        <Col md="6" xs="12">
                          <Label htmlFor="name">First Name</Label>
                          <Input type="text" id="name" disabled="disabled" placeholder="First name" required value={user.name.first}/>
                        </Col>
                        <Col md="6" xs="12">
                          <Label htmlFor="name">Last Name</Label>
                          <Input type="text" id="name" disabled="disabled" placeholder="Last name" required value={user.name.last}/>
                        </Col>
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="name">Email</Label>
                        <Input valid={this.state.emailValid} type="email" id="name" placeholder="Email address" required defaultValue={this.state.email} onChange={this.handleEmailChange}/>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="6" xs="12">
                          <Label htmlFor="name">Phone</Label>
                          <Input type="text" id="name" disabled="disabled" placeholder="Phone number" required value={user.phone}/>
                        </Col>
                        <Col md="6" x="12">
                          <Label htmlFor="name">Username</Label>
                          <Input type="text" id="name" placeholder="Username" required defaultValue={this.state.username} onChange={this.handleUsernameChange}/>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button onClick={e=>this.doUpdate(e, candidateUpdateById)} className="float-right" type="submit" size="sm" color="primary">
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

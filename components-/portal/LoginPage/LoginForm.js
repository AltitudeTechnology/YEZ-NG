import { Component } from 'react'
import { Mutation, withApollo } from 'react-apollo'

import { Row, Col, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Form } from 'reactstrap';
import { toast } from 'react-toastify';

import storeToken from '../../../lib/auth/storeToken'
import redirect from '../../../lib/redirect'
import { LOGIN_CANDIDATE_MUTATION } from '../../../lib/graphql/mutations'
import { PHONE_REGEX, TOAST_STYLE } from '../../../utils/common'

class Page extends Component {
  constructor(props){
    super(props)
    this.state = {
      phone: '',
      password: '',
      // validation
      phoneValid: null
    }
  }

  handlePhoneChange = (event) => {
    if (PHONE_REGEX.test(event.target.value)){
      this.setState({phoneValid: true});
    } else {
      this.setState({phoneValid: null});
    }
    this.setState({phone: event.target.value});
  };

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  };

  submitForm = (e, loginUser) => {
    e.preventDefault()
    e.stopPropagation()

    const { phone, password, phoneValid } = this.state;

    if (phoneValid) {
      loginUser({
        variables: {
          phone,
          password,
        },
      });
    } else {
      if (!phoneValid) {
        this.setState({phoneValid: false})
      }
      toast("Your Inputs are not valid", {...TOAST_STYLE.fail});
    }
  }

  onLoginError = error => {
    // console.log(error);

    if (error.graphQLErrors.length==0)
      toast("Something Unexpected happened :(", {...TOAST_STYLE.fail});

    error.graphQLErrors.forEach(error=>{
      switch(error.message) {
        case `phone/user not found`:
        toast("Incorrect phone/password", {...TOAST_STYLE.fail});
        break;
        default:
        toast("Something Unexpected happened :(", {...TOAST_STYLE.fail});
      }
    })
  };

  onCompleted = ({ loginCandidate: { token, name } }) => {
    toast(`Welcome Back ${name}!`, {...TOAST_STYLE.success});

    // Store the token in browser cookies
    storeToken(token);
    // Force a reload of all the current queries now that the user is logged in
    this.props.client.resetStore().then(() => {
      // const target = this.props.url.query.from || `/user`;
      const target = `/user`;
      redirect({}, target)
    })
  }

  render(){
    return (
      <Mutation mutation={LOGIN_CANDIDATE_MUTATION}
        onCompleted={this.onCompleted}
        onError={this.onLoginError}>
        {(loginCandidate) => (
          <Form onSubmit={e => this.submitForm(e, loginCandidate)}>
            <InputGroup className="mb-3">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-user"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                // valid={false}
                valid={this.state.phoneValid}
                invalid={(this.state.phoneValid === false) ? true : null}
                onChange={this.handlePhoneChange}
                type="text"
                placeholder="Phone Number"
                required
              />
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="icon-lock"></i>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                valid={this.state.passwordValid}
                onChange={this.handlePasswordChange}
                type="password"
                placeholder="Password"
                required
              />
            </InputGroup>
            <Row>
              <Col xs="6">
                <Button type="submit" color="primary" className="px-4">Login</Button>
              </Col>
              <Col xs="6" className="text-right">
                <Button color="link" className="px-0">Forgot password?</Button>
              </Col>
            </Row>
          </Form>
        )}
    </Mutation>
    )
  }
}

export default withApollo(Page)

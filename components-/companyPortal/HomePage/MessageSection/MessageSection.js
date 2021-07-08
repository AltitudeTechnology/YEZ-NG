import { Component} from 'react'
import { Mutation } from 'react-apollo'

import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  Label,
  Input,
  Form,
  FormText,
  FormGroup,
  Collapse,
  Button
} from 'reactstrap';
import { toast } from 'react-toastify'

import { TOAST_STYLE } from '../../../../utils/common'
import { CREATE_COMPANY_MESSAGE_MUTATION } from '../../../../lib/backendApi/mutations'

export default class NewMessage extends Component {
  constructor(props){
    super(props)
    this.toggle = this.toggle.bind(this);
    this.onCompleted = this.onCompleted.bind(this);
    this.onError = this.onError.bind(this);
    this.state = {
      collapse: false,
      title: '',
      message: ''
    }
  }

  toggle() {
    this.setState({collapse: !this.state.collapse});
  }

  handleFieldChange(field, value){
    this.setState({[field]: value});
  }

  doUpdate = (e, runMutation) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(this.state);

    if (this.state.title && this.state.message){
      runMutation({ variables: {
        company: this.props.company._id,
        title: this.state.title || '',
        message: this.state.message || ''
      }})
    } else {
      toast("Please Validate your inputs", {...TOAST_STYLE.fail});
    }
  }

  onCompleted = ({createCompanyMessage: {record: {title}}}) => {
    toast("Your Message has been submitted. We'll get back to you as soon as possible", {...TOAST_STYLE.success});
    this.setState({
      title: '',
      message: ''
    })
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

  render(){
    return (
      <Row>
        <Col xs="12" sm="12" md="12">
          <Card className="card-accent-dark">
            <CardHeader className="h4" style={{fontWeight: '300'}}>
              <i className="icon-envelope-letter"></i><strong>Send us a Message</strong>
              <Label className="switch switch-lg switch-text switch-info float-right mb-0">
                <Input type="checkbox" className="switch-input" onClick={this.toggle}/>
                <span className="switch-label" data-on="On" data-off="Off"></span>
                <span className="switch-handle"></span>
              </Label>
            </CardHeader>
            <Collapse isOpen={this.state.collapse}>
              <CardBody>
                <Row style={{padding: '30px'}}>
                  <Mutation mutation={CREATE_COMPANY_MESSAGE_MUTATION} onCompleted={this.onCompleted} onError={this.onError}>
                    {(createCompanyMessage, {data, error}) => (
                      <Form action="" method="post" className="form-horizontal" style={{width: '100%'}}>
                        {/* <FormGroup row>
                          <Col md="1">
                            <Label htmlFor="hf-password">From:</Label>
                          </Col>
                          <Col xs="12" md="5">
                            <Input type="text" id="hf-from" name="hf-password" placeholder="YOU  &lt;user@outlet.com&gt;"/>
                          </Col>
                          <Col md="1">
                            <Label htmlFor="hf-email">To:</Label>
                          </Col>
                          <Col xs="12" md="5">
                            <Input type="email" id="hf-email" name="hf-email" placeholder="KTT4President &lt;support@KTT4president.com&gt;"/>
                          </Col>
                        </FormGroup> */}
                        <FormGroup row>
                          <Col md="1">
                            <Label htmlFor="hf-password">Title:</Label>
                          </Col>
                          <Col xs="12" md="11">
                            <Input type="text" id="hf-from" name="hf-password" placeholder="Enter a Title"
                              onChange={(e)=>this.handleFieldChange('title', e.target.value)}
                              value={this.state.title}/>
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Col md={{offset: 1, size: 11}}>
                            <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                               placeholder="Type your message"
                               onChange={(e)=>this.handleFieldChange('message', e.target.value)}
                               value={this.state.message}/>
                          </Col>
                        </FormGroup>
                        <div style={{width: '100%'}}>
                          <Button className="float-right" color="primary" onClick={e=>this.doUpdate(e, createCompanyMessage)} style={{marginBottom: '1rem'}}>Send Message</Button>
                        </div>
                      </Form>
                    )}
                  </Mutation>
                </Row>
              </CardBody>
            </Collapse>
          </Card>
        </Col>
      </Row>
    )
  }
}

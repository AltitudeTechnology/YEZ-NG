import { Component } from 'react'
import {Query} from 'react-apollo'
import moment from 'moment'

import {
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip
} from 'reactstrap';

import { prettifyState } from '../../../../../utils/common'

import DetailsModal from './DetailsModal'

export default class EducationList extends Component {
  constructor(props){
    super(props)
    this.state = {
      showConfirmModal: false,
      modalOpen: false,
      isEmpty: true,
      selectedreferee: {},
      deleteJobId: ''
    }
    this.toggle = this.toggle.bind(this);
    this.toggleConfirm = this.toggleConfirm.bind(this);
    this.save = this.save.bind(this);
  }
  toggle(referee){
    // console.log(referee);
    this.setState({selectedreferee: referee})
    this.setState({modalOpen: !this.state.modalOpen})
  }
  toggleConfirm(referee){
    this.setState({deleteJobId: referee._id || ''})
    this.setState({showConfirmModal: !this.state.showConfirmModal})
  }
  save(){
    //console.log('saving');
    setTimeout(()=>this.setState({modalOpen: !this.state.modalOpen}), 2000)
  }

 render(){
   return(
    <div>
      <ListGroup>
        {this.props.candidate.referees.map((referee, index)=>(
          <ListGroupItem key={index} className="animated fadeIn">
            <ListGroupItemHeading>
              <div className="float-right">
                <Button onClick={()=>this.toggle(referee)} className="btn-sm" outline color="primary"><i className="icon-pencil"></i>&nbsp; View</Button>
              </div>
              <a href="#!" id={`UncontrolledTooltipExample${index}`}>
                <i className={referee.isVerified ? 'text-success icon-check' : 'text-danger icon-close'}></i>
              </a>
              <UncontrolledTooltip placement="top" target={`UncontrolledTooltipExample${index}`}>
               {referee.isVerified ? 'has been verified' : 'has not been verified'}
             </UncontrolledTooltip>
              {` ${referee.name.first} ${referee.name.last}`}
            </ListGroupItemHeading>
            <ListGroupItemText>
              <p style={{marginBottom: '0px'}}><i className="icon-envelope"></i> {referee.email} </p>
              <p><i className="icon-phone"></i> {referee.phone}</p>
            </ListGroupItemText>
          </ListGroupItem>
        ))}
      </ListGroup>
      <DetailsModal isOpen={this.state.modalOpen} toggle={this.toggle} save={this.save} referee={this.state.selectedreferee}/>
    </div>
   )
  }
}

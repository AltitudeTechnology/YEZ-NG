import { Component } from 'react'
import {Query} from 'react-apollo'
// import moment from 'moment'

import {
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import { prettifyState } from '../../../../../utils/common'

import DetailsModal from './DetailsModal'

export default class ItemList extends Component {
  constructor(props){
    super(props)
    this.state = {
      showConfirmModal: false,
      modalOpen: false,
      isEmpty: true,
      selecteditem: {},
      deleteItemId: ''
    }
    this.toggle = this.toggle.bind(this);
    this.toggleConfirm = this.toggleConfirm.bind(this);
    this.save = this.save.bind(this);
  }
  toggle(item){
    // console.log(item);
    this.setState({selecteditem: item})
    this.setState({modalOpen: !this.state.modalOpen})
  }
  toggleConfirm(item){
    this.setState({deleteItemId: item._id || ''})
    this.setState({showConfirmModal: !this.state.showConfirmModal})
  }
  save(){
    // console.log('saving');
    setTimeout(()=>this.setState({modalOpen: !this.state.modalOpen}), 2000)
  }

 render(){
   return(
    <div>
      <ListGroup>
        {this.props.candidate.education.map((item, index)=>(
          <ListGroupItem key={index} className="animated fadeIn">
            <ListGroupItemHeading>
              <div className="float-right">
                <Button onClick={()=>this.toggle(item)} className="btn-sm" outline color="primary"><i className="icon-pencil"></i>&nbsp; View</Button>
              </div>
              {item.school}
            </ListGroupItemHeading>
            <div>
              <p style={{marginBottom: '0px'}}><i className="icon-graduation"></i> {item.degree}, {item.field} </p>
              <p>{item.duration}</p>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <DetailsModal isOpen={this.state.modalOpen} toggle={this.toggle} save={this.save} education={this.state.selecteditem}/>
    </div>
   )
  }
}

import { Component } from 'react'
import {Query} from 'react-apollo'
import moment from 'moment'

import {
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

import { prettifyState } from '../../../../utils/common'

import DetailsModal from './DetailsModal'
import DeleteButton from './DeleteButton'

export default class EducationList extends Component {
  constructor(props){
    super(props)
    this.state = {
      showConfirmModal: false,
      modalOpen: false,
      isEmpty: true,
      selectedjob: {},
      deleteJobId: ''
    }
    this.toggle = this.toggle.bind(this);
    this.toggleConfirm = this.toggleConfirm.bind(this);
    this.save = this.save.bind(this);
  }
  toggle(job){
    // console.log(job);
    this.setState({selectedjob: job})
    this.setState({modalOpen: !this.state.modalOpen})
  }
  toggleConfirm(job){
    this.setState({deleteJobId: job._id || ''})
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
        {this.props.candidate.experience.map((job, index)=>(
          <ListGroupItem key={index} className="animated fadeIn">
            <ListGroupItemHeading>
              <div className="float-right">
                <Button onClick={()=>this.toggle(job)} className="btn-sm" outline color="primary"><i className="icon-pencil"></i>&nbsp; Edit</Button>
                {' '}<Button onClick={()=>this.toggleConfirm(job)} className="btn-sm" outline color="danger"><i className="icon-trash"></i></Button>
              </div>
              {job.role}
            </ListGroupItemHeading>
            <div>
              <p style={{marginBottom: '0px'}}><i className="icon-briefcase"></i> {job.companyName}</p>
              <p style={{marginBottom: '0px'}}>{job.duration} | {job.isWorkingHere ? `${moment(job.startDate, "YYYYMMDD").fromNow(true)}` : `${moment(job.startDate, "YYYYMMDD").from(job.endDate, true)}`}</p>
              <p>{prettifyState(job.state)}</p>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <DetailsModal isOpen={this.state.modalOpen} toggle={this.toggle} save={this.save} experience={this.state.selectedjob}/>
      <Modal isOpen={this.state.showConfirmModal} toggle={()=>this.toggleConfirm({})} className='modal-md modal-danger' centered>
        <ModalBody className="text-center">
          <p className={'display-4 text-danger'} style={{fontSize: '1.9rem'}}>Are you sure you want to delete this experience?</p>
        </ModalBody>
        <ModalFooter>
          <DeleteButton details={{id: this.state.deleteJobId}} toggleConfirm={()=>this.toggleConfirm({})}/>
          <Button color="secondary" onClick={this.toggleConfirm}>No thanks</Button>
        </ModalFooter>
      </Modal>
    </div>
   )
  }
}

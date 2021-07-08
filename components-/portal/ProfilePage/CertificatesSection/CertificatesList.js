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
      selectedcertificate: {},
      deleteJobId: ''
    }
    this.toggle = this.toggle.bind(this);
    this.toggleConfirm = this.toggleConfirm.bind(this);
    this.save = this.save.bind(this);
  }
  toggle(certificate){
    // console.log(certificate);
    this.setState({selectedcertificate: certificate})
    this.setState({modalOpen: !this.state.modalOpen})
  }
  toggleConfirm(certificate){
    this.setState({deleteJobId: certificate._id || ''})
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
        {this.props.candidate.certificates.map((certificate, index)=>(
          <ListGroupItem key={index} className="animated fadeIn">
            <ListGroupItemHeading>
              <div className="float-right">
                <Button onClick={()=>this.toggle(certificate)} className="btn-sm" outline color="primary"><i className="icon-pencil"></i>&nbsp; Edit</Button>
                {' '}<Button onClick={()=>this.toggleConfirm(certificate)} className="btn-sm" outline color="danger"><i className="icon-trash"></i></Button>
              </div>
              {certificate.name}
            </ListGroupItemHeading>
            <div>
              <p style={{marginBottom: '0px'}}><i className="icon-organization"></i> {certificate.authority}</p>
              {certificate.url && (<p style={{marginBottom: '0px'}}><a target="_blank" href={`http://${certificate.url}`}>{certificate.url}</a></p>)}
              <p>{certificate.duration} {certificate.licenseNumber && `| ${certificate.licenseNumber}`}</p>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <DetailsModal isOpen={this.state.modalOpen} toggle={this.toggle} save={this.save} certificate={this.state.selectedcertificate}/>
      <Modal isOpen={this.state.showConfirmModal} toggle={()=>this.toggleConfirm({})} className='modal-md modal-danger' centered>
        <ModalBody className="text-center">
          <p className={'display-4 text-danger'} style={{fontSize: '1.9rem'}}>Are you sure you want to delete this certificates?</p>
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

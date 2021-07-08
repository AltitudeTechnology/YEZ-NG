import {Component} from 'react'
import axios from 'axios'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify'

import {
  Button,
  Col,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import Img from 'react-image'

import { TOAST_STYLE, removeEmpty } from '../../../../utils/common'
import { MANAGER_CANDIDATE_BY_ID_DOCUMENTS_QUERY } from '../../../../lib/backendApi/queries'
import { MANAGER_CANDIDATE_BY_ID_DOCUMENT_UPLOAD_MUTATION } from '../../../../lib/backendApi/mutations'

// TODO use React Ladda for upload button
export default class DetailsModal extends Component{
  constructor(props) {
    super(props)
    this.state = {
      fileName: '',
      fileURL: '',
      isBusy: false,
      // file: props.file,
      details: {}
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.resetState = this.resetState.bind(this);
    this.doUpload = this.doUpload.bind(this);
  }

  resetState(){
    this.setState({
      fileName: '',
      fileURL: '',
      uploadedBy: '',
      details: {}
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({isBusy: false})
  }

  handleFieldChange(field, value){
    this.setState({[field]: value});
  }

  doUpload = async (e, runMutation) => {
    e.preventDefault()
    e.stopPropagation()

    const { file, candidateId } = this.props;
    const { fileName, isBusy } = this.state;
    // console.log(this.props.file);

    if (file && fileName){
      const uploadPreset = 'xrnkmz4c'; //process.env.REACT_APP_UPLOAD_PRESET;
      const cloudName = 'hjmavbxvc'; //process.env.REACT_APP_CLOUD_NAME;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);

      try {
        this.setState({isBusy: true})
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
        );

        runMutation({ variables: {
          managedId: candidateId,
          managedModelType: 'Candidate',
          fileTitle: fileName,
          ...response.data
        }})
      } catch (e) {
        this.setState({isBusy: false})
        console.log(e);
        toast("Something went wrong while uploading document", {...TOAST_STYLE.fail});
      }
    }
  }

  onCompleted = (data) => {
    this.setState({isBusy: false})
    const {addCandidateDocument: {record: {fileTitle}}} = data
    toast(`${fileTitle} has been uploaded`, {...TOAST_STYLE.success});
    this.props.toggle();
  }

  onError = (error) => {
    console.log(error);
    this.setState({isBusy: false})
    toast("Something Went wrong while saving document", {...TOAST_STYLE.fail});
    // TODO delete image from cloudinary
  }

  render(){
    const {file={}, perPage, candidateId, pages} = this.props;
    const {isBusy} = this.state;
    return(
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className='modal-lg modal-teal'>
        <ModalHeader toggle={this.props.toggle}>Add Document</ModalHeader>
        <Form encType="multipart/form-data" className="form-horizontal">
        <ModalBody>
          <FormGroup>
            <Img
              src={file.preview}
              style={{maxWidth: '100%', maxHeight: '100%'}}/>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="name">Document Name</Label>
              <Input type="text" id="name" placeholder="Eg: WAEC Result" required
                onChange={(e)=>this.handleFieldChange('fileName', e.target.value)}
                defaultValue={this.state.fileName}/>
              <FormText className="mb-3" style={{fontSize: '10px'}} color="danger"><i>Name of the document to be uploaded</i></FormText>
            </FormGroup>
        </ModalBody>
        <Mutation mutation={MANAGER_CANDIDATE_BY_ID_DOCUMENT_UPLOAD_MUTATION}
          onCompleted={this.onCompleted}
          onError={this.onError}
          refetchQueries={()=> pages.map(page=>({
            query: MANAGER_CANDIDATE_BY_ID_DOCUMENTS_QUERY,
            variables: {
              page: page,
              id: candidateId,
              perPage: perPage
            }
          }))}>
          {(addCandidateDocument)=>(
            <ModalFooter>
              {isBusy ? (
                <div>
                  <span>uploading image...</span>{' '}
                  <Button color="primary" disabled={true}>Upload</Button>{' '}
                  <Button disabled={true} color="secondary">Cancel</Button>
                </div>
                ) : (
                <div>
                  <Button type="submit" color="primary"
                    onClick={e=>this.doUpload(e, addCandidateDocument)}
                    disabled={this.state.fileName.length > 5 ? false: true}
                    >Upload</Button>
                  {' '}<Button type="reset" color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </div>
              )}
            </ModalFooter>
            )}
        </Mutation>
      </Form>
      </Modal>
    )
  }
}

import { Component } from 'react'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify';
import { Button } from 'reactstrap'

import { TOAST_STYLE, removeEmpty, enumifyState } from '../../../../utils/common'
import { VIEWER_CANDIDATE_CERTIFICATES_QUERY } from '../../../../lib/backendApi/queries'
import { DELETE_CERTIFICATE_MUTATION } from '../../../../lib/backendApi/mutations'


export default class DeleteButton extends Component {
  constructor(props){
    super(props)
    this.doDelete = this.doDelete.bind(this);
  }

  shouldComponentUpdate(){
    return false
  }

  doDelete = (e, runMutation) => {
    let data = this.props.details;

    runMutation({
      variables: {id: data.id},
      update: (proxy, { data: { deleteCertificate } }) => {
        // Read the data from our cache for this query.
        const data = proxy.readQuery({ query: VIEWER_CANDIDATE_CERTIFICATES_QUERY });

        // Remove the deleted certificates from VIEWER_CANDIDATE_CERTIFICATES_QUERY
        data.viewerCandidate.candidate.certificates = data.viewerCandidate.candidate.certificates.filter(e => e._id != deleteCertificate.recordId);

        // Write our data back to the cache.
        proxy.writeQuery({ query: VIEWER_CANDIDATE_CERTIFICATES_QUERY, data });
      }
    })
    this.props.toggleConfirm();
  }

  onCompleted = (data) => {
    const {deleteCertificate: {record: {authority}}} = data
    toast(`Your certificate from ${authority} has been deleted`, {...TOAST_STYLE.success});
    this.props.toggleConfirm();
  }

  onError = (error) => {
    console.log(error);
    toast("Something Went wrong", {...TOAST_STYLE.fail});
  }

  render(){
    return(
      <Mutation mutation={DELETE_CERTIFICATE_MUTATION} onCompleted={this.onCompleted} onError={this.onError}>
        {(deleteCertificate)=>(
          <Button color="danger" onClick={e=>this.doDelete(e, deleteCertificate)}>Delete</Button>
        )}
      </Mutation>
    )
  }
}
//export default DeleteButton

import { Component } from 'react'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify';
import { Button } from 'reactstrap'

import { TOAST_STYLE, removeEmpty, enumifyState } from '../../../../utils/common'
import { VIEWER_CANDIDATE_EDUCATION_QUERY } from '../../../../lib/backendApi/queries'
import { DELETE_EDUCATION_MUTATION } from '../../../../lib/backendApi/mutations'


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
      update: (proxy, { data: { deleteEducation } }) => {
        // Read the data from our cache for this query.
        const data = proxy.readQuery({ query: VIEWER_CANDIDATE_EDUCATION_QUERY });

        // Remove the deleted education from VIEWER_CANDIDATE_EDUCATION_QUERY
        data.viewerCandidate.candidate.education = data.viewerCandidate.candidate.education.filter(e => e._id != deleteEducation.recordId);

        // Write our data back to the cache.
        proxy.writeQuery({ query: VIEWER_CANDIDATE_EDUCATION_QUERY, data });
      }
    })
    this.props.toggleConfirm();
  }

  onCompleted = (data) => {
    const {deleteEducation: {record: {school}}} = data
    toast(`Your education at ${school} has been deleted`, {...TOAST_STYLE.success});
    this.props.toggleConfirm();
  }

  onError = (error) => {
    console.log(error);
    toast("Something Went wrong", {...TOAST_STYLE.fail});
  }

  render(){
    return(
      <Mutation mutation={DELETE_EDUCATION_MUTATION} onCompleted={this.onCompleted} onError={this.onError}>
        {(deleteEducation)=>(
          <Button color="danger" onClick={e=>this.doDelete(e, deleteEducation)}>Delete</Button>
        )}
      </Mutation>
    )
  }
}
//export default DeleteButton

import { Component } from 'react'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify';
import { Button } from 'reactstrap'

import { TOAST_STYLE, removeEmpty, enumifyState } from '../../../../utils/common'
import { VIEWER_CANDIDATE_REFEREES_QUERY } from '../../../../lib/backendApi/queries'
import { DELETE_REFEREE_MUTATION } from '../../../../lib/backendApi/mutations'


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
      update: (proxy, { data: { deleteReferee } }) => {
        // Read the data from our cache for this query.
        const data = proxy.readQuery({ query: VIEWER_CANDIDATE_REFEREES_QUERY });

        // Remove the deleted referees from VIEWER_CANDIDATE_REFEREES_QUERY
        data.viewerCandidate.candidate.referees = data.viewerCandidate.candidate.referees.filter(e => e._id != deleteReferee.recordId);

        // Write our data back to the cache.
        proxy.writeQuery({ query: VIEWER_CANDIDATE_REFEREES_QUERY, data });
      }
    })
    this.props.toggleConfirm();
  }

  onCompleted = (data) => {
    const {deleteReferee: {record: {name: {last}}}} = data
    toast(`${last} has been removed from your referee list`, {...TOAST_STYLE.success});
    this.props.toggleConfirm();
  }

  onError = (error) => {
    console.log(error);
    toast("Something Went wrong", {...TOAST_STYLE.fail});
  }

  render(){
    return(
      <Mutation mutation={DELETE_REFEREE_MUTATION} onCompleted={this.onCompleted} onError={this.onError}>
        {(deleteReferee)=>(
          <Button color="danger" onClick={e=>this.doDelete(e, deleteReferee)}>Delete</Button>
        )}
      </Mutation>
    )
  }
}
//export default DeleteButton

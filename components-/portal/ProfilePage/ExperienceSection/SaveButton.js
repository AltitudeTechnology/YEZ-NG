import { Component } from 'react'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify';
import { Button } from 'reactstrap'

import { TOAST_STYLE, removeEmpty, enumifyState } from '../../../../utils/common'
import { VIEWER_CANDIDATE_EXPERIENCE_QUERY } from '../../../../lib/backendApi/queries'
import { CREATE_EXPERIENCE_MUTATION } from '../../../../lib/backendApi/mutations'

export default class SaveButton extends Component {
  constructor(props){
    super(props)
    this.save = this.save.bind(this);
  }

  shouldComponentUpdate(){
    return false
  }

  save = (e, runMutation) => {
    // console.log(this.props.details);
    let data = this.props.details
    data.state = enumifyState(data.state);

    if (data.companyName && data.role && data.address && data.fromYear) {

      removeEmpty(data);

      if(data.isWorkingHere){
        delete data.toMonth;
        delete data.toYear;
      }
      runMutation({
        variables: data,
        update: (proxy, { data: { addJobExperience } }) => {
          // Read the data from our cache for this query.
          const data = proxy.readQuery({ query: VIEWER_CANDIDATE_EXPERIENCE_QUERY });

          // Add the new experience to VIEWER_CANDIDATE_EXPERIENCE_QUERY
          data.viewerCandidate.candidate.experience.push(addJobExperience.record);

          // Write our data back to the cache.
          proxy.writeQuery({ query: VIEWER_CANDIDATE_EXPERIENCE_QUERY, data });
        }
      })

    } else {
      let message ='Invalid inputs';
      if (!data.role) {
        message = 'Role/Position field is empty';
        toast(message, {...TOAST_STYLE.fail});
      } else if (!data.companyName) {
        message = 'Company Name field is empty';
        toast(message, {...TOAST_STYLE.fail});
      } else if (!data.address) {
        message = 'Address field is empty';
        toast(message, {...TOAST_STYLE.fail});
      } else
        toast(message, {...TOAST_STYLE.fail});
    }
  }

  onCompleted = (data) => {
    const {addJobExperience: {record: {companyName}}} = data
    toast(`Your experience at ${companyName} has been added`, {...TOAST_STYLE.success});
    this.props.close();
  }

  onError = (error) => {
    console.log(error);
    toast("Something Went wrong", {...TOAST_STYLE.fail});
  }


  render(){
    return(
      <Mutation mutation={CREATE_EXPERIENCE_MUTATION} onCompleted={this.onCompleted} onError={this.onError}>
        {(addJobExperience)=>(
          <Button color="primary" onClick={e=>this.save(e, addJobExperience)}>Save</Button>
        )}
      </Mutation>
    )
  }
}
//export default SaveButton

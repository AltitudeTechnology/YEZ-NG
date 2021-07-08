import { Component } from 'react'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify';
import { Button } from 'reactstrap'

import { TOAST_STYLE, CURRENT_YEAR, removeEmpty } from '../../../../utils/common'
import { VIEWER_CANDIDATE_EDUCATION_QUERY } from '../../../../lib/backendApi/queries'
import { CREATE_EDUCATION_MUTATION } from '../../../../lib/backendApi/mutations'

export default class SaveButton extends Component {
  constructor(props){
    super(props)
    this.save = this.save.bind(this);
  }

  shouldComponentUpdate(){
    return false
  }

  save = (e, runMutation) => {
    let data = this.props.details

    if (data.school && data.degree && data.field && data.fromYear && data.toYear) {

      removeEmpty(data);

      if (data.toYear > CURRENT_YEAR)
        data.isSchoolingHere = true;

      runMutation({
        variables: data,
        update: (proxy, { data: { addEducation } }) => {
          // Read the data from our cache for this query.
          const data = proxy.readQuery({ query: VIEWER_CANDIDATE_EDUCATION_QUERY });

          // Add the new education to VIEWER_CANDIDATE_EDUCATION_QUERY
          data.viewerCandidate.candidate.education.push(addEducation.record);

          // Write our data back to the cache.
          proxy.writeQuery({ query: VIEWER_CANDIDATE_EDUCATION_QUERY, data });
        }
      })
    } else {
      let message ='Invalid inputs';
      if (!data.school) {
        message = 'School Name field is empty';
        toast(message, {...TOAST_STYLE.fail});
      } else if (!data.degree) {
        message = 'Degree field is empty';
        toast(message, {...TOAST_STYLE.fail});
      } else if (!data.field) {
        message = 'Tell us what you studied! please';
        toast(message, {...TOAST_STYLE.fail});
      } else if (!data.fromYear || !data.toYear) {
        message = 'Year field is empty';
        toast(message, {...TOAST_STYLE.fail});
      } else
        toast(message, {...TOAST_STYLE.fail});
    }
  }

  onCompleted = (data) => {
    const {addEducation: {record: {school}}} = data
    toast(`Your experience at ${school} has been added`, {...TOAST_STYLE.success});
    this.props.close();
  }

  onError = (error) => {
    console.log(error);
    toast("Something Went wrong", {...TOAST_STYLE.fail});
  }


  render(){
    return(
      <Mutation mutation={CREATE_EDUCATION_MUTATION} onCompleted={this.onCompleted} onError={this.onError}>
        {(addEducation)=>(
          <Button color="primary" onClick={e=>this.save(e, addEducation)}>Save</Button>
        )}
      </Mutation>
    )
  }
}
//export default SaveButton

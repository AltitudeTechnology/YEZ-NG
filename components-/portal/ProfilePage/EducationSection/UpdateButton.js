import { Component } from 'react'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify';
import { Button } from 'reactstrap'

import { TOAST_STYLE, CURRENT_YEAR, removeEmpty } from '../../../../utils/common'
import { UPDATE_EDUCATION_MUTATION } from '../../../../lib/backendApi/mutations'

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
        variables: data
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
    const {updateEducation: {record: {school}}} = data
    toast(`Your experience at ${school} has been updated`, {...TOAST_STYLE.success});
    this.props.close();
  }

  onError = (error) => {
    console.log(error);
    toast("Something Went wrong", {...TOAST_STYLE.fail});
  }

  render(){
    return(
      <Mutation mutation={UPDATE_EDUCATION_MUTATION} onCompleted={this.onCompleted} onError={this.onError}>
        {(updateEducation)=>(
          <Button color="primary" onClick={e=>this.save(e, updateEducation)}>Update</Button>
        )}
      </Mutation>
    )
  }
}
//export default SaveButton

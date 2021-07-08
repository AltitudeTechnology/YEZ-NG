import { Component } from 'react'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify';
import { Button } from 'reactstrap'

import { TOAST_STYLE, removeEmpty, enumifyState } from '../../../../utils/common'
import { UPDATE_EXPERIENCE_MUTATION } from '../../../../lib/backendApi/mutations'

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

      runMutation({
        variables: data
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
    const {updateJobExperience: {record: {companyName}}} = data
    toast(`Your experience at ${companyName} has been updated`, {...TOAST_STYLE.success});
    this.props.close();
  }

  onError = (error) => {
    console.log(error);
    toast("Something Went wrong", {...TOAST_STYLE.fail});
  }

  render(){
    return(
      <Mutation mutation={UPDATE_EXPERIENCE_MUTATION} onCompleted={this.onCompleted} onError={this.onError}>
        {(updateJobExperience)=>(
          <Button color="primary" onClick={e=>this.save(e, updateJobExperience)}>Update</Button>
        )}
      </Mutation>
    )
  }
}
//export default SaveButton

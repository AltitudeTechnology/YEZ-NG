import { Component } from 'react'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify';
import { Button } from 'reactstrap'

import { TOAST_STYLE, removeEmpty, enumifyState } from '../../../../utils/common'
import { UPDATE_REFEREE_MUTATION } from '../../../../lib/backendApi/mutations'

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

    if (data.firstName && data.lastName && data.phone && data.email) {

      removeEmpty(data);

      runMutation({
        variables: data
      })

    } else {
      let message ='Invalid inputs';
      if (!data.firstName) {
        message = 'First name field is empty';
        toast(message, {...TOAST_STYLE.fail});
      } else if (!data.lastName) {
        message = 'Last name field is empty';
        toast(message, {...TOAST_STYLE.fail});
      } else if (!data.phone) {
        message = 'Phone number field is empty';
        toast(message, {...TOAST_STYLE.fail});
      } else if (!data.email) {
        message = 'Email field is empty';
        toast(message, {...TOAST_STYLE.fail});
      } else
        toast(message, {...TOAST_STYLE.fail});
    }
  }

  onCompleted = (data) => {
    const {updateReferee: {record: {name: {last}}}} = data
    toast(`${last} has been updated in your referee list`, {...TOAST_STYLE.success});
    this.props.close();
  }

  onError = (error) => {
    console.log(error);
    toast("Something Went wrong", {...TOAST_STYLE.fail});
  }

  render(){
    return(
      <Mutation mutation={UPDATE_REFEREE_MUTATION} onCompleted={this.onCompleted} onError={this.onError}>
        {(updateReferee)=>(
          <Button color="primary" onClick={e=>this.save(e, updateReferee)}>Update</Button>
        )}
      </Mutation>
    )
  }
}
//export default SaveButton

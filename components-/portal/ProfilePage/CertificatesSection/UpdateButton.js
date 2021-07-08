import { Component } from 'react'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify';
import { Button } from 'reactstrap'

import { TOAST_STYLE, removeEmpty, enumifyState } from '../../../../utils/common'
import { UPDATE_CERTIFICATE_MUTATION } from '../../../../lib/backendApi/mutations'

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

    if (data.authority && data.name && data.licenseNumber && data.fromYear) {

      removeEmpty(data);

      if(data.doesNotExpire){
        delete data.toMonth;
        delete data.toYear;
      }
      runMutation({
        variables: data
      })

    } else {
      let message ='Invalid inputs';
      if (!data.authority) {
        message = 'Certificate authority field is empty';
        toast(message, {...TOAST_STYLE.fail});
      } else if (!data.name) {
        message = 'Certificate name field is empty';
        toast(message, {...TOAST_STYLE.fail});
      } else
        toast(message, {...TOAST_STYLE.fail});
    }
  }

  onCompleted = (data) => {
    const {updateCertificate: {record: {authority}}} = data
    toast(`Your certificate from ${authority} has been updated`, {...TOAST_STYLE.success});
    this.props.close();
  }

  onError = (error) => {
    console.log(error);
    toast("Something Went wrong", {...TOAST_STYLE.fail});
  }

  render(){
    return(
      <Mutation mutation={UPDATE_CERTIFICATE_MUTATION} onCompleted={this.onCompleted} onError={this.onError}>
        {(updateCertificate)=>(
          <Button color="primary" onClick={e=>this.save(e, updateCertificate)}>Update</Button>
        )}
      </Mutation>
    )
  }
}
//export default SaveButton

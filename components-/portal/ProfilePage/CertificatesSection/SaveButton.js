import { Component } from 'react'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify';
import { Button } from 'reactstrap'

import { TOAST_STYLE, removeEmpty, enumifyState } from '../../../../utils/common'
import { VIEWER_CANDIDATE_CERTIFICATES_QUERY } from '../../../../lib/backendApi/queries'
import { CREATE_CERTIFICATE_MUTATION } from '../../../../lib/backendApi/mutations'

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
        variables: data,
        update: (proxy, { data: { addCertificate } }) => {
          // Read the data from our cache for this query.
          const data = proxy.readQuery({ query: VIEWER_CANDIDATE_CERTIFICATES_QUERY });

          // Add the new certificates to VIEWER_CANDIDATE_CERTIFICATES_QUERY
          data.viewerCandidate.candidate.certificates.push(addCertificate.record);

          // Write our data back to the cache.
          proxy.writeQuery({ query: VIEWER_CANDIDATE_CERTIFICATES_QUERY, data });
        }
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
    const {addCertificate: {record: {authority}}} = data
    toast(`Your certificate from ${authority} has been added`, {...TOAST_STYLE.success});
    this.props.close();
  }

  onError = (error) => {
    console.log(error);
    toast("Something Went wrong", {...TOAST_STYLE.fail});
  }


  render(){
    return(
      <Mutation mutation={CREATE_CERTIFICATE_MUTATION} onCompleted={this.onCompleted} onError={this.onError}>
        {(addCertificate)=>(
          <Button color="primary" onClick={e=>this.save(e, addCertificate)}>Save</Button>
        )}
      </Mutation>
    )
  }
}
//export default SaveButton

import { Component } from 'react'
import { Query } from 'react-apollo'
import {
  Card,
  CardBody,
  Button,
  CardTitle,
} from 'reactstrap'

import {MANAGER_CANDIDATE_BY_ID_CERTIFICATES_QUERY} from '../../../../../lib/backendApi/queries'
import Loading from '../../../../common/LoadingIcon/LoadingIcon'

// import DetailsModal from './DetailsModal'
import CertificatesList from './CertificatesList'

const EmptySpace = props => (
  <p className="display-4" style={{padding: '10px 0px 10px'}}>
    <i className="icon-ghost"></i> This space is lonely
  </p>
)

export default class extends Component {
  constructor(props){
    super(props)
    this.state = {
      modalOpen: false,
    }
    this.toggle = this.toggle.bind(this);
    this.save = this.save.bind(this);
  }

  toggle(){
    this.setState({modalOpen: !this.state.modalOpen})
  }
  save(){
    setTimeout(()=>this.setState({modalOpen: !this.state.modalOpen}), 2000)
  }

  render(){
    return (
      <Card>
        <Query query={MANAGER_CANDIDATE_BY_ID_CERTIFICATES_QUERY} variables={{ id: this.props.id}}>
          {({loading, error, data}) => {
            if (loading)
              return <Loading />
            if (error)
              return `Error! ${error.message}`;

              const {managerCandidateById} = data;
              const candidate = managerCandidateById;
            return(
              <CardBody >
                <CardTitle className="mb-0">
                    Certificates
                  </CardTitle>
                  <hr/> {
                    (!candidate.certificates.length>0)
                    ? (<div className="text-center">
                      <EmptySpace/>
                    </div>)
                    : (<div>
                      <CertificatesList candidate={candidate}/>
                    </div>)
                  }
                </CardBody>
            )}}
          </Query>
      </Card>
    )
  }
}

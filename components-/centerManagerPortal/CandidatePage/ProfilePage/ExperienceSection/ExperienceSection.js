import { Component } from 'react'
import { Query } from 'react-apollo'
import {
  Card,
  CardBody,
  Button,
  CardTitle,
} from 'reactstrap'

import {MANAGER_CANDIDATE_BY_ID_EXPERIENCE_QUERY} from '../../../../../lib/backendApi/queries'
import Loading from '../../../../common/LoadingIcon/LoadingIcon'

import JobList from './JobList'

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
    // console.log(this.props.id);
    // console.log('this.props.id');
    return (
      <Card>
        <Query query={MANAGER_CANDIDATE_BY_ID_EXPERIENCE_QUERY} variables={{ id: this.props.id}}>
          {({loading, error, data}) => {
            if (loading)
              return <Loading />
            if (error)
              return `Error! ${error.message}`;

            const {managerCandidateById, currentTime} = data;
            const candidate = managerCandidateById;
            return(
              <CardBody >
                <CardTitle className="mb-0">
                    Work Experience
                  </CardTitle>
                  <hr/> {
                    (!candidate.experience.length>0)
                    ? (<div className="text-center">
                      <EmptySpace/>
                    </div>)
                    : (<div>
                      <JobList candidate={candidate} currentTime={currentTime}/>
                    </div>)
                  }
                </CardBody>
            )}}
          </Query>
      </Card>
    )
  }
}

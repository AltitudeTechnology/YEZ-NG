import { Component } from 'react'
import { Query } from 'react-apollo'
import {
  Card,
  CardBody,
  Button,
  CardTitle,
} from 'reactstrap'

import {VIEWER_CANDIDATE_EXPERIENCE_QUERY} from '../../../../lib/backendApi/queries'

import DetailsModal from './DetailsModal'
import JobList from './JobList'
import SaveButton from './SaveButton'

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
        <Query query={VIEWER_CANDIDATE_EXPERIENCE_QUERY}>
          {({loading, error, data}) => {
            if (loading)
              return "Loading...";
            if (error)
              return `Error! ${error.message}`;

            const {viewerCandidate: {candidate}} = data;
            return(
              <CardBody >
                <CardTitle className="mb-0">
                    {
                    (candidate.experience.length>0) && (
                      <Button className="float-right" size="sm" color="primary" onClick={this.toggle}>
                        <i className="icon-plus"></i> Add
                      </Button>)
                    }
                    Work Experience
                  </CardTitle>
                  <hr/> {
                    (!candidate.experience.length>0)
                    ? (<div className="text-center">
                      <EmptySpace/>
                      <Button size="lg" color="primary" onClick={this.toggle}>
                        <i className="icon-plus"></i> Add Work Experience
                      </Button>
                    </div>)
                    : (<div>
                      <JobList candidate={candidate}/>
                    </div>)
                  }
                </CardBody>
            )}}
          </Query>
        <DetailsModal isOpen={this.state.modalOpen} toggle={this.toggle} save={this.save} isNew/>
      </Card>
    )
  }
}

import { Component } from 'react'
import Router from 'next/router'
import { Query } from 'react-apollo'
import moment from 'moment'

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardTitle,
  Table,
  Badge,
  Row,
  Col,
  UncontrolledCollapse
} from 'reactstrap'

import {MANAGER_CANDIDATE_BY_ID_CASE_FILES_QUERY} from '../../../../lib/backendApi/queries'
import Loading from '../../../common/LoadingIcon/LoadingIcon'

import CaseFile from './CaseFile'

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
  }

  render(){
    // console.log(MANAGER_CANDIDATE_BY_ID_CASE_FILES_QUERY);
    return (
      <Card>
        <CardBody >
          <CardTitle className="mb-0">
            <div className="float-right">
              <Button size="sm" color="primary"
                onClick={()=>Router.push('/manager/candidates')}>
                <i className="icon-plus"></i> New
              </Button>{' '}
              <Button size="sm" color="dark"
                onClick={()=>Router.push('/manager/candidates')}>
                <i className="icon-docs"></i> View All
              </Button>
            </div>
            Case Files
          </CardTitle>
          <hr />
          <Query query={MANAGER_CANDIDATE_BY_ID_CASE_FILES_QUERY} variables={{ id: this.props.id}}>
            {({loading, error, data}) => {
              if (loading)
                return <Loading />;
              if (error)
                return `Error! ${error.message}`;

                const {managerCandidateById} = data;
                const candidate = managerCandidateById;
                let currentDate = '';
              return(
                <div className="text-center">{
                 (candidate.caseFiles.length==0) ? (
                   <EmptySpace />
                 ) : (
                   <div>
                     {(candidate.caseFiles.map((caseFile)=>{
                       let sameDay = (moment(caseFile.createdAt).format('MMMM Do YYYY') == moment(currentDate).format('MMMM Do YYYY'));
                       if (!sameDay)
                        currentDate = caseFile.createdAt;
                       return (
                         <div>
                           <div style={{fontWeight: '500', marginBottom: '10px'}}>
                             {(!sameDay) && `${moment(caseFile.createdAt).format('MMMM Do YYYY')}`}
                           </div>
                           <CaseFile caseFile={caseFile}/>
                         </div>
                       )
                     }))}
                   </div>
                 )
                }</div>
              )}}
            </Query>
          {/* <div>
            <CaseFile />
            <CaseFile />
          </div> */}
        </CardBody>
      </Card>
    )
  }
}
/*
<Query query={HOME_COMPANY_JOBS_QUERY}>
  {({loading, error, data}) => {
    if (loading)
    return (
      <CardBody >
        <CardTitle className="mb-0">
          Jobs Posted
        </CardTitle>
        <hr />
        Loading...
      </CardBody>
    );
    if (error)
    return `Error! ${error.message}`;

    const {viewerCenterManager: {centerManager}, currentTime} = data;
    return(
      <CardBody >
        <CardTitle className="mb-0">
          {
            (centerManager.jobs.length>0) && (
              <Button className="float-right" size="sm" color="primary"
                onClick={()=>Router.push('/centerManager/job/create')}>
                <i className="icon-plus"></i> Add
              </Button>)
            }
            Jobs Posted
          </CardTitle>
          <hr/> {
            (!centerManager.jobs.length>0)
            ? (<div className="text-center">
              <EmptySpace/>
              <Button size="lg" color="primary" onClick={()=>Router.push('/centerManager/job/create')}>
              <i className="icon-plus"></i> Add Jobs
            </Button>
          </div>)
          : (<div>
            <JobsList centerManager={centerManager} currentTime={currentTime}/>
          </div>)
        }
      </CardBody>
    )}}
  </Query>
*/

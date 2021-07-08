import { Component } from 'react'
import Router from 'next/router'
import { Query } from 'react-apollo'
import Pagination from "react-js-pagination"

import {
  Card,
  CardBody,
  Button,
  CardTitle,
  Table,
  Badge,
  InputGroup,
  InputGroupAddon,
  Input,
  Row,
  Col
} from 'reactstrap'

import {HOME_COMPANY_JOBS_QUERY} from '../../../../lib/backendApi/queries'

// import CandidatesList from './CandidatesList'

const EmptySpace = props => (
  <p className="display-4" style={{padding: '10px 0px 10px'}}>
    <i className="icon-ghost"></i> This space is lonely
  </p>
)

export default class extends Component {
  constructor(props){
    super(props)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.state = {
      currentPage: 1,
      perPage: 5,
      modalOpen: false,
    }
  }

  handlePageChange(pageNumber) {
    this.setState({currentPage: pageNumber});
  }

  render(){
    return (
      <Card>
        <CardBody >
          <CardTitle className="mb-0">
            {/* <Button className="float-right" size="sm" color="dark"
              onClick={()=>Router.push('/manager/candidates')}>
              <i className="icon-docs"></i> View All
            </Button> */}
            Candidates
          </CardTitle>
          <hr />
          {/* Loading... */}
          <Row>
            <Col md="8">
              showing <b>1 - 20</b> of <b>201893</b> candidates
              {/* <b>
                {` ${!jobsPagination.pageInfo.hasPreviousPage ? 1 : (1+(jobsPagination.pageInfo.currentPage-1)*jobsPagination.pageInfo.perPage)}
                -
                ${!jobsPagination.pageInfo.hasNextPage ? jobsPagination.pageInfo.itemCount : (jobsPagination.pageInfo.perPage+(jobsPagination.pageInfo.currentPage-1)*jobsPagination.pageInfo.perPage)} `}</b>
              of
              <b> {jobsPagination.pageInfo.itemCount}</b> Jobs */}
            </Col>
            <Col md="4">
              <InputGroup>
                <Input type="text" id="searchBar" placeholder="Search.."/>
                <InputGroupAddon addonType="prepend">
                  <Button type="button" color="primary"><i className="icon-magnifier"></i></Button>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
          <br />
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Tests Taken</th>
                <th>Phone Number</th>
                <th>Assignment</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Samppa Nori</td>
                <td>
                  <Badge color="success">Skill Analysis</Badge>{' '}
                  <Badge color="primary">Job Seeker</Badge>{' '}
                  <Badge color="danger">Entrepreneur</Badge>
                </td>
                <td>08188555611</td>
                <td>Trainer {`<Bello Oladipupo>`}</td>
              </tr>
              <tr>
                <td>Samppa Nori</td>
                <td>
                  <Badge color="success">Skill Analysis</Badge>{' '}
                </td>
                <td>08188555611</td>
                <td>Trainer {`<Bello Oladipupo>`}</td>
              </tr>
              <tr>
                <td>Samppa Nori</td>
                <td>
                </td>
                <td>08188555611</td>
                <td>Trainer {`<Bello Oladipupo>`}</td>
              </tr>
              <tr>
                <td>Samppa Nori</td>
                <td>
                  <Badge color="success">Skill Analysis</Badge>{' '}
                  <Badge color="danger">Entrepreneur</Badge>
                </td>
                <td>08188555611</td>
                <td>Trainer {`<Bello Oladipupo>`}</td>
              </tr>
            </tbody>
          </Table>
          <div className="float-center" style={{textAlign: 'center', width: 'fit-content', margin: 'auto'}}>
            <br/>
            <Pagination
              activePage={this.state.currentPage}
              itemsCountPerPage={this.state.perPage}
              totalItemsCount={201893}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange}
             />
          </div>
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

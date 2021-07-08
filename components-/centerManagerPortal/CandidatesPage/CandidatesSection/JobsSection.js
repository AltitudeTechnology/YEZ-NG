import { Component } from 'react'
import Router from 'next/router'
import { Query } from 'react-apollo'
import Pagination from "react-js-pagination"

import {
  Card,
  CardBody,
  Button,
  CardTitle,
  InputGroup,
  InputGroupAddon,
  Input,
  Row,
  Col
} from 'reactstrap'

import {COMPANY_JOBS_PAGINATION_QUERY} from '../../../../lib/backendApi/queries'

import JobsList from './JobsList'

const EmptySpace = props => (
  <p className="display-4" style={{padding: '10px 0px 10px'}}>
    <i className="icon-ghost"></i> This space is lonely
  </p>
)

export default class extends Component {
  constructor(props){
    super(props);
    var exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
    this.handlePageChange = this.handlePageChange.bind(this);
    this.state = {
      currentPage: 1,
      perPage: 5,
      modalOpen: false,
      exampleItems,
      pageOfItems: []
    }
  }

  handlePageChange(pageNumber) {
    // console.log(`active page is ${pageNumber}`);
    this.setState({currentPage: pageNumber});
  }

  render(){
    return (
      <Card>
        <Query query={COMPANY_JOBS_PAGINATION_QUERY}
          variables={{ page: this.state.currentPage, perPage: this.state.perPage }}>
          {({loading, error, data}) => {
            if (loading)
              return "Loading...";
            if (error)
              return `Error! ${error.message}`;

            const {viewerCompany: {company}, currentTime} = data;
            const { jobsPagination } = company;
            return(
              <CardBody >
                <CardTitle className="mb-0">
                    {
                    (jobsPagination.items.length>0) && (
                      <div className="float-right">
                        <Button  size="sm" color="primary"
                          onClick={()=>Router.push('/company/job/create')}>
                          <i className="icon-plus"></i> Add
                        </Button>
                      </div>
                      )
                    }
                    Jobs Posted
                  </CardTitle>
                  <hr/>
                  <Row>
                    <Col md="8">
                      showing
                      <b>
                        {` ${!jobsPagination.pageInfo.hasPreviousPage ? 1 : (1+(jobsPagination.pageInfo.currentPage-1)*jobsPagination.pageInfo.perPage)}
                        -
                        ${!jobsPagination.pageInfo.hasNextPage ? jobsPagination.pageInfo.itemCount : (jobsPagination.pageInfo.perPage+(jobsPagination.pageInfo.currentPage-1)*jobsPagination.pageInfo.perPage)} `}</b>
                      of
                      <b> {jobsPagination.pageInfo.itemCount}</b> Jobs
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
                  {
                    (!jobsPagination.items.length>0)
                    ? (<div className="text-center">
                      <EmptySpace/>
                      <Button size="lg" color="primary" onClick={()=>Router.push('/company/job/create')}>
                        <i className="icon-plus"></i> Add Jobs
                      </Button>
                    </div>)
                    : (<div>
                      <JobsList company={company} currentTime={currentTime}/>
                    </div>)
                  }
                  <div className="float-center" style={{textAlign: 'center', width: 'fit-content', margin: 'auto'}}>
                    <br/>
                    <Pagination
                      activePage={this.state.currentPage}
                      itemsCountPerPage={jobsPagination.pageInfo.perPage}
                      totalItemsCount={jobsPagination.pageInfo.itemCount}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                     />
                  </div>
                </CardBody>
            )}}
          </Query>
      </Card>
    )
  }
}

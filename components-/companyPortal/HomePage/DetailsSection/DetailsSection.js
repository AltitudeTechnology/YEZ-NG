import {Card, CardBody, CardTitle, CardGroup, Row, Col} from 'reactstrap'
import {Query} from 'react-apollo'

import {HOME_VIEWER_COMPANY_QUERY} from '../../../../lib/backendApi/queries'
import { prettifyState } from '../../../../utils/common'

const styles = {
  image: {
    maxHeight: '80px',
    marginBottom: '10px'
  },
  details: {
    marginLeft: '-15px',
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  steps: {
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: '19px',
    fontWeight: '500'
  }
}

export default props => (
  <CardGroup className="mb-4">
    <Card className="border-dark text-center">
      <Query query={HOME_VIEWER_COMPANY_QUERY}>
        {({loading, error, data}) => {
          if (loading)
            return "Loading...";
          if (error)
            return `Error! ${error.message}`;

          const {viewerCompany: {company}} = data;
          const user = company;
          // console.log(user);
          return (
            <CardBody>
              <Row>
                <Col sm="12">
                  <img style={styles.image} src={'/static/images/5.jpg'} className="img-avatar" alt="bellooladipupo41@gmail.com"/>
                  <CardTitle className="mb-0">{user ? user.name : `Company Name`}</CardTitle>
                  <div className="small text-muted">{user.address}, {prettifyState(user.stateOfResidence)}</div>
                </Col>
              </Row>
              <hr/>
              {user.phone && (<div className="text-muted"><i className="icon-phone"></i> {user.phone}</div>)}
              {user.email && (<div className="text-muted"><i className="icon-envelope"></i> {user.email}</div>)}
              {user.website && (<div className="text-muted"><i className="icon-globe"></i> <a target="_blank" href={`http://${user.website}`}>{user.website}</a></div>)}
            </CardBody>
          )
        }}
      </Query>
    </Card>
    <Card className="text-white bg-dark text-center">
      <CardBody style={styles.steps}>
        <div style={{textAlign: 'left'}}>
          <p><i className="icon-check text-success text-large"></i> Complete Your Company Profile</p>
          <p><i className="icon-check text-success"></i> Get Verified</p>
          <p><i className="icon-close text-danger"></i> Post Jobs</p>
          <p><i className="icon-close text-danger"></i> Profit $$</p>
        </div>
      </CardBody>
    </Card>
  </CardGroup>
)

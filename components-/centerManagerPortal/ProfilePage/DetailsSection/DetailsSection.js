import {Card, CardBody, CardTitle, Row, Col} from 'reactstrap'

import { prettifyState } from '../../../../utils/common'

const styles = {
  image: {
    maxWidth: '90px',
    marginBottom: '10px'
  }
}
export default props => {
  const {user = {}} = props;
  return(
<Card className="text-center">
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
</Card>
)
}

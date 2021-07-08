import {Card, CardBody, CardTitle, Row, Col} from 'reactstrap'
import {prettifyState} from '../../../../../utils/common'
import moment from 'moment'

const styles = {
  image: {
    maxWidth: '90px',
    marginBottom: '10px'
  }
}
export default props => {
  const {user = {}, currentTime} = props;
  return(
    <Card className="text-center">
      <CardBody>
        <Row>
          <Col sm="12">
            <img style={styles.image} src={'/static/images/5.jpg'} className="img-avatar" alt="bellooladipupo41@gmail.com"/>
            <CardTitle className="mb-0">{user ? `${user.name.first} ${user.name.last}` : `Lastname Firstname`}</CardTitle>
            <div className="small text-muted">{user.username ? `@${user.username}` : `pick a username`}</div>
            <div className="text-muted">{user.nationality}, {user.gender}</div>
            <div className="text-muted">{user.address && `${user.address},`} {prettifyState(user.stateOfResidence)}</div>
          </Col>
        </Row>
        <hr/>
        {user.dateOfBirth && (<div className="text-muted"><i className="icon-user"></i> {moment(user.dateOfBirth).format("DD/MM/YYYY")}, {moment(user.dateOfBirth, "YYYYMMDD").from(currentTime, true)}</div>)}
        {user.phone && (<div className="text-muted"><i className="icon-phone"></i> {user.phone}</div>)}
        {user.email && (<div className="text-muted"><i className="icon-envelope"></i> {user.email}</div>)}
      </CardBody>
    </Card>
  )
}

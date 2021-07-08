import {Card, CardBody, CardTitle, Row, Col} from 'reactstrap'

const styles = {
  image: {
    maxWidth: '90px',
    marginBottom: '10px'
  }
}
export default props => {
  const user = props.user || {};
  return(
    <Card className="text-center">
      <CardBody>
        <Row>
          <Col sm="12">
            <img style={styles.image} src={'/static/images/5.jpg'} className="img-avatar" alt="bellooladipupo41@gmail.com"/>
            <CardTitle className="mb-0">{user ? `${user.name.first} ${user.name.last}` : `Lastname Firstname`}</CardTitle>
            <div className="small text-muted">{user.username ? `@${user.username}` : `pick a username`}</div>
          </Col>
        </Row>
        <hr/>
        {user.phone && (<div className="text-muted"><i className="icon-phone"></i> {user.phone}</div>)}
        {user.email && (<div className="text-muted"><i className="icon-envelope"></i> {user.email}</div>)}
      </CardBody>
    </Card>
  )
}

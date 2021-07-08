import { Col, Row , Button , Card, CardBody } from 'reactstrap'

export default props => (
  <Card className="border-info text-center">
    <CardBody>
      {/* <p>Take the test</p> */}
      <Row style={{padding: '30px 0px 30px'}}>
        <Col md="6">
          <p className="display-4 text-primary">FOR</p>
          <p className="display-4 text-primary">JOB SEEKERS</p>
          <Button className="btn-lg" outline color="primary"><i className="icon-pencil"></i>&nbsp; Take the Test</Button>
        </Col>
        <Col md="6">
          <p className="display-4 text-danger">FOR</p>
          <p className="display-4 text-danger">ENTREPRENEURS</p>
          <Button className="btn-lg" outline color="danger"><i className="icon-pencil"></i>&nbsp; Take the Test</Button>
        </Col>
      </Row>
    </CardBody>
  </Card>
)

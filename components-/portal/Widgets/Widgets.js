import {Row, Col, CardGroup} from 'reactstrap';
import Widget01 from './Widget01';
import Widget02 from './Widget02';
import Widget03 from './Widget03';
import Widget04 from './Widget04';

export default props => (
  <div>
    {/*<Row>
      <Col xs={12} sm={6} md={3}>
        <Widget03 dataBox={() => ({variant: "facebook", friends : "89k", feeds: "459"})}/>
      </Col>
      <Col xs={12} sm={6} md={3}>
        <Widget03 dataBox={() => ({variant: "twitter", followers : "973k", tweets: "1.792"})}/>
      </Col>
      <Col xs={12} sm={6} md={3}>
        <Widget03 dataBox={() => ({variant: "linkedin", contacts : "500+", feeds: "292"})}/>
      </Col>
      <Col xs={12} sm={6} md={3}>
        <Widget03 dataBox={() => ({variant: "google-plus", followers : "894", circles: "92"})}/>
      </Col>
    </Row>*/}
    <CardGroup className="mb-4">
      <Widget01 color="danger" value="5" variant="inverse" header="5%" smallText="">
        <small className="text-muted">Your Profile</small>
      </Widget01>
      <Widget04 icon="icon-feed" color="primary" header="18" value="25">Broadcasts</Widget04>
      <Widget04 icon="icon-clock" color="danger" header="5:34:11" value="75" invert>Till Next Event</Widget04>
      <Widget04 icon="icon-people" color="primary" header="87,500" value="100">Employers</Widget04>
      <Widget04 icon="icon-user-follow" color="success" header="139,019" value="100" invert>Employed</Widget04>
    </CardGroup>
  </div>
)

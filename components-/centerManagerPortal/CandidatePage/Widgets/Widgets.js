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
      {/* <Widget02 header="$1.999,50" mainText="Income" icon="fa fa-cogs" color="primary"/> */}
      <Widget02 scrollTo={props.scrollTo} scrollToRef="documents" header="Documents" mainText="upload" icon="icon-cloud-upload" color="info" variant="1"/>
      <Widget02 scrollTo={props.scrollTo} scrollToRef="results" header="Results" mainText="skip to" icon="icon-book-open" color="primary" variant="1"/>
      <Widget02 scrollTo={props.scrollTo} scrollToRef="documents" header="Trainer" mainText="Re-assign to" icon="icon-link" color="danger" variant="1"/>
      <Widget02 scrollTo={props.scrollTo} scrollToRef="caseFiles" header="Case Files" mainText="skip to" icon="icon-layers" color="primary" variant="1"/>
      <Widget02 scrollTo={props.scrollTo} scrollToRef="caseFiles" header="Case File" mainText="create" icon="icon-plus" color="teal" variant="1"/>
      {/* <Widget04 icon="icon-cloud-upload" color="info" header="12" value="100" invert>Upload Documents</Widget04> */}
      {/* <Widget04 icon="icon-book-open" color="primary" header="Results" value="100">Skip To</Widget04>
      <Widget04 icon="icon-link" color="danger" header="unassigned" value="100" invert>Re-assign Candidate</Widget04>
      <Widget04 icon="icon-layers" color="primary" header="Case Files" value="100">Skip To</Widget04>
      <Widget04 icon="icon-plus" color="teal" header="13 Case Files" value="100" invert>Create</Widget04> */}
      <style jsx>{`
        .card {
          box-shadow: 0 0 0 0.2rem rgba(32, 168, 216, 0.25);
        }
        `}</style>
    </CardGroup>
  </div>
)

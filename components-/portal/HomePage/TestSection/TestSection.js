import { Component } from 'react'
import { Col, Row , Button , Card, CardBody } from 'reactstrap'

export default class TestSection extends Component {
  constructor(props){
    super(props)
    this.state={
      showSeekerLink: true,
      showStartupLink: true,
      showSkillsLink: true
    }

    this.takeSkillTest = this.takeSkillTest.bind(this);
  }

  takeSkillTest (){
    console.log('true');
    this.setState({showSkillsLink: !this.state.showSkillsLink})
  }

  render(){
    return (
      <Card className="border-info text-center" id="tests">
        <CardBody>
          {(this.state.showSkillsLink) ? (
            <Row style={{padding: '30px 0px 30px'}}>
              <Col>
                <p className="display-4 text-success">SKILLS ANALYSIS</p>
                <Button onClick={this.takeSkillTest} className="btn-lg" outline color="success"><i className="icon-pencil"></i>&nbsp; Take the Test</Button>
              </Col>
            </Row>
          ) : (
            <div>
              <Row style={{padding: '30px 0px 30px'}}>
                <Col>
                  <p className="display-4 text-success"><i className="icon-graph"></i> You took the</p>
                  <p className="display-4 text-success">SKILLS ANALYSIS test</p>
                  <Button onClick={this.takeSkillTest} className="btn-lg" outline color="success"><i className="icon-docs"></i>&nbsp; View your Results</Button>
                </Col>
              </Row>
              <hr />
              <Row style={{padding: '30px 0px 30px'}}>
                {(this.state.showSeekerLink) ? (
                  <Col md="6">
                    <p className="display-4 text-primary">FOR</p>
                    <p className="display-4 text-primary">JOB SEEKERS</p>
                    <Button className="btn-lg" outline color="primary"><i className="icon-pencil"></i>&nbsp; Take the Test</Button>
                  </Col>
                ) : (
                  <Col md="6">
                    <p className="display-4 text-primary"><i className="icon-fire"></i> You took the</p>
                    <p className="display-4 text-primary">JOB SEEKERS test</p>
                    <Button className="btn-lg" outline color="primary"><i className="icon-docs"></i>&nbsp; View your Results</Button>
                  </Col>
                )}
                {(this.state.showStartupLink) ? (
                  <Col md="6">
                    <p className="display-4 text-danger">FOR</p>
                    <p className="display-4 text-danger">ENTREPRENEURS</p>
                    <Button className="btn-lg" outline color="danger"><i className="icon-pencil"></i>&nbsp; Take the Test</Button>
                  </Col>
                ) : (
                  <Col md="6">
                    <p className="display-4 text-danger"><i className="icon-rocket"></i> You took the</p>
                    <p className="display-4 text-danger">ENTREPRENEURS test</p>
                    <Button className="btn-lg" outline color="danger"><i className="icon-docs"></i>&nbsp; View your Results</Button>
                  </Col>
                )}
              </Row>
            </div>
          )}
        </CardBody>
      </Card>
    )
  }
}

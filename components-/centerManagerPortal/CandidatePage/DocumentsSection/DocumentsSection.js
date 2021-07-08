import { Component } from 'react'
import {
  Card,
  CardBody,
  CardTitle,
} from 'reactstrap'

import DocumentsList from './DocumentsList'

export default class extends Component {
  constructor(props){
    super(props)
    this.state = { }
  }

  render(){
    return (
      <Card >
        <CardBody >
          <CardTitle className="mb-0">Documents</CardTitle>
          <hr />
          {/* Loading... */}
          <DocumentsList id={this.props.id}/>
        </CardBody>
      </Card>
    )
  }
}

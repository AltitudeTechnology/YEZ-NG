import { Component } from 'react'
import { Glyphicon, Badge } from 'react-bootstrap'

export default class CustomToggle extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (
      <div onClick={this.handleClick} className="notifications dropdown dd-trigger">
         {/* <span className="count animated" id="notifications-count">{/*<Badge>4</Badge></span> */}
         {/* <i className="fa fa-bell-o"></i> */}
         <i className="glyphicon glyphicon-bell"></i>
         <style jsx>{`
           .count {
             position: absolute;
             top: -6px;
             right: -1px;
             height: 15px;
             width: 15px;
             overflow: hidden;
             background: #21b7b7;
             color: #fff;
             text-align: center;
             border-radius: 100%;
             font-size: 9px;
             font-weight: bold;
             line-height: 15px;
           }
           .notifications {
             margin-right: 10px;
           }
         `}</style>
       </div>
    );
  }
}

import { Component } from 'react'
import { Badge } from 'react-bootstrap'

export default class CustomMenu extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  focusNext() {
    const input = ReactDOM.findDOMNode(this.input);

    if (input) {
      input.focus();
    }
  }

  render() {
    const { children } = this.props;
    const { value } = this.state;

    return (
        <div className="dropdown-menu animated" id="notification-dropdown" style={{ padding: '' }}>
         <div className="dropdown-header">
           <span className="triangle"></span>
           <span className="heading">Notifications</span>
           <span className="count" id="dd-notifications-count"><Badge>0</Badge></span>
         </div>
         <div className="dropdown-body">
           {/* <ul className="list-unstyled">
             {React.Children.toArray(children).filter(
               child => !value.trim() || child.props.children.indexOf(value) !== -1
             )}
           </ul> */}
           {/* {[...Array(4).keys()].map(i=>(
             <div className="notification new">
               <div className="notification-image-wrapper">
                 <div className="notification-image">
                   <img src="https://imagemoved.files.wordpress.com/2011/07/no-strings-attached-natalie-portman-19128381-850-1280.jpg" alt="" width="32"/>
                 </div>
               </div>
               <div className="notification-text">
                 <span className="highlight">Natalie Portman</span> upvoted your post
               </div>
             </div>
           ))}
           <div className="notification">
             <div className="notification-image-wrapper">
               <div className="notification-image">
                 <img src="http://www.latimes.com/includes/projects/hollywood/portraits/keanu_reeves.jpg" alt="" width="32"/>
               </div>
             </div>
             <div className="notification-text">
               <span className="highlight">Keanu Reeves</span> shared you comment
             </div>
           </div> */}
           <div className="notification new">
             {/* <div className="notification-image-wrapper">
               <div className="notification-image">
                 <img src="http://www.latimes.com/includes/projects/hollywood/portraits/keanu_reeves.jpg" alt="" width="32"/>
               </div>
             </div> */}
             <div className="notification-text">
               😫 <span className="highlight">You</span> have no notifications
             </div>
           </div>
         </div>
         <style jsx>{`
           .dropdown-menu {
             position: absolute;
             // display: none;
             z-index: 99;
             left: -130px;
             top: 20px;
             min-height: 10px;
             min-width: 10px;
             width: 280px;
           }
           .dropdown-menu .dropdown-header {
             background: #fff;
             padding: 15px;
             position: relative;
             text-align: center;
             color: #747f8b;
             font-weight: bold;
             border-radius: 10px 10px 0 0;
             border: 0px;
             border-style: solid;
             border-bottom-width: 1px;
             -moz-border-image: -moz-linear-gradient(right, #fff, #cedae0, #cedae0, #fff) 1 20%;
             -o-border-image: -o-linear-gradient(right, #fff, #cedae0, #cedae0, #fff) 1 20%;
             border-image: linear-gradient(to right, #fff 0%, #cedae0 40%, #cedae0 60%, #fff 100%) 1 20%;
             box-shadow: 0px 2px 10px -2px #cedae0;
           }
           .dropdown-menu .dropdown-header .triangle {
             position: absolute;
             top: -8px;
             left: 134px;
             height: 15px;
             width: 15px;
             border-radius: 6px 0px 0px 0px;
             transform: rotate(45deg);
             background: #fff;
           }
           .dropdown-menu .dropdown-header .count {
             position: static;
             height: 25px;
             width: 25px;
             display: inline-block;
             line-height: 24px;
             margin-left: 8px;
             font-size: 12px;
             vertical-align: middle;
           }
           .dropdown-menu .dropdown-body {
             max-height: 292px;
             background: #e9f0f3;
             overflow-y: auto;
             overflow-x: hidden;
           }
           .dropdown-menu .dropdown-body .notification {
             background: #fff;
             padding: 15px;
             border: 0px;
             border-style: solid;
             border-bottom-width: 1px;
             -moz-border-image: -moz-linear-gradient(right, #fff, #cedae0, #cedae0, #fff) 1 20%;
             -o-border-image: -o-linear-gradient(right, #fff, #cedae0, #cedae0, #fff) 1 20%;
             border-image: linear-gradient(to right, #fff 0%, #cedae0 40%, #cedae0 60%, #fff 100%) 1 20%;
           }
           .dropdown-menu .dropdown-body .notification.new {
             -webkit-transition: all 500ms ease;
             -moz-transition: all 500ms ease;
             -ms-transition: all 500ms ease;
             -o-transition: all 500ms ease;
             transition: all 500ms ease;
             background: #e9f0f3;
           }
           .dropdown-menu .dropdown-body .notification .notification-image-wrapper {
             display: table-cell;
             vertical-align: middle;
           }
           .dropdown-menu .dropdown-body .notification .notification-image {
             display: inline-block;
             height: 32px;
             width: 32px;
             overflow: hidden;
             border-radius: 100%;
           }
           .dropdown-menu .dropdown-body .notification .notification-text {
             display: table-cell;
             padding-left: 15px;
             vertical-align: middle;
             color: #747f8b;
             cursor: pointer;
             font-size: 14px;
             word-spacing: 2px;
             line-height: 21px;
           }
           .dropdown-menu .dropdown-body .notification .notification-text .highlight {
             font-weight: bold;
           }
           ::-webkit-scrollbar {
             width: 3px;
           }
           ::-webkit-scrollbar-track {
             webkit-box-shadow: inset 0 0 6px #e3ebef;
             -webkit-border-radius: 10px;
             border-radius: 10px;
             background: #e3ebef;
           }
           ::-webkit-scrollbar-thumb {
             -webkit-border-radius: 10px;
             border-radius: 10px;
             background: #9fb6c3;
             -webkit-box-shadow: none;
           }
           ::-webkit-scrollbar-thumb:window-inactive {
             background: #9fb6c3;
           }
           .new.notification.ng-enter {
             -webkit-transition: all 500ms ease;
             -moz-transition: all 500ms ease;
             -ms-transition: all 500ms ease;
             -o-transition: all 500ms ease;
             transition: all 500ms ease;
             margin-top: -20%;
             background: #dde6eb !important;
           }
           .new.notification.ng-enter-active {
             margin-top: 0;
           }
           .animated {
             -webkit-animation-duration: 500ms;
             animation-duration: 500ms;
             -webkit-animation-fill-mode: both;
             animation-fill-mode: both;
           }
           @-webkit-keyframes fadeInDown {
             from {
               opacity: 0;
               -webkit-transform: translate3d(0, -10%, 0);
               transform: translate3d(0, -10%, 0);
             }
             to {
               opacity: 1;
               -webkit-transform: none;
               transform: none;
             }
           }
           @keyframes fadeInDown {
             from {
               opacity: 0;
               -webkit-transform: translate3d(0, -10%, 0);
               transform: translate3d(0, -10%, 0);
             }
             to {
               opacity: 1;
               -webkit-transform: none;
               transform: none;
             }
           }
           .fadeInDown {
             -webkit-animation-name: fadeInDown;
             animation-name: fadeInDown;
           }
           @-webkit-keyframes fadeOutUp {
             from {
               opacity: 1;
             }
             to {
               opacity: 0;
               -webkit-transform: translate3d(0, -10%, 0);
               transform: translate3d(0, -10%, 0);
             }
           }
           @keyframes fadeOutUp {
             from {
               opacity: 1;
             }
             to {
               opacity: 0;
               -webkit-transform: translate3d(0, -10%, 0);
               transform: translate3d(0, -10%, 0);
             }
           }
           .fadeOutUp {
             -webkit-animation-name: fadeOutUp;
             animation-name: fadeOutUp;
           }
           @-webkit-keyframes fadeOut {
             from {
               opacity: 1;
             }
             to {
               opacity: 0;
             }
           }
           @keyframes fadeOut {
             from {
               opacity: 1;
             }
             to {
               opacity: 0;
             }
           }
           .fadeOut {
             -webkit-animation-name: fadeOut;
             animation-name: fadeOut;
           }
           @-webkit-keyframes fadeIn {
             from {
               opacity: 0;
             }
             to {
               opacity: 1;
             }
           }
           @keyframes fadeIn {
             from {
               opacity: 0;
             }
             to {
               opacity: 1;
             }
           }
           .fadeIn {
             -webkit-animation-name: fadeIn;
             animation-name: fadeIn;
           }
           @-webkit-keyframes zoomIn {
             from {
               opacity: 0;
               -webkit-transform: scale3d(0.3, 0.3, 0.3);
               transform: scale3d(0.3, 0.3, 0.3);
             }
             50% {
               opacity: 1;
             }
           }
           @keyframes zoomIn {
             from {
               opacity: 0;
               -webkit-transform: scale3d(0.3, 0.3, 0.3);
               transform: scale3d(0.3, 0.3, 0.3);
             }
             50% {
               opacity: 1;
             }
           }
           .zoomIn {
             -webkit-animation-name: zoomIn;
             animation-name: zoomIn;
           }
           @-webkit-keyframes zoomOut {
             from {
               opacity: 1;
             }
             50% {
               opacity: 0;
               -webkit-transform: scale3d(0.3, 0.3, 0.3);
               transform: scale3d(0.3, 0.3, 0.3);
             }
             to {
               opacity: 0;
             }
           }
           @keyframes zoomOut {
             from {
               opacity: 1;
             }
             50% {
               opacity: 0;
               -webkit-transform: scale3d(0.3, 0.3, 0.3);
               transform: scale3d(0.3, 0.3, 0.3);
             }
             to {
               opacity: 0;
             }
           }
           .zoomOut {
             -webkit-animation-name: zoomOut;
             animation-name: zoomOut;
           }
         `}</style>
        </div>
    );
  }
}

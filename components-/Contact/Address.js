import {Component} from 'react'
import { Table } from 'reactstrap'

export default class Address extends Component {
    render() {
        return (
            <div>
                <div className="heading">
                    <h2>contact info</h2>
                </div>
                <div className="address-info">
                    {/* <ul>
                        <li><i className="fa fa-phone" aria-hidden="true"></i>(+1) 1234 567 8900</li>
                        <li><i className="fa fa-envelope" aria-hidden="true"></i>info@yormail.com</li>
                        <li><i className="fa fa-home" aria-hidden="true"></i>Architecture Downtown St, Melbourne Australia</li>
                    </ul>
                    <div className="footer-social-link">
                        <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                        <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                        <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                        <a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
                        <a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a>
                    </div> */}

                    <Table bordered style={{width : '100%'}}>
                        <tbody>
                        <tr>
                            <td><i className="fa fa-phone" aria-hidden="true"></i>(+1) 1234 567 8900</td>
                        </tr>
                        <tr>
                            <td><i className="fa fa-envelope" aria-hidden="true"></i>info@yormail.com</td>
                        </tr>
                        <tr>
                            <td><i className="fa fa-home" aria-hidden="true"></i>Architecture Downtown St, Melbourne Australia</td>
                        </tr>
                        <tr>
                        <div className="address-social-link">
                            <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                            <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                            <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                            <a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a>
                        </div> 
                        </tr>
                        </tbody>
                    </Table>

                </div>
            </div>
        )
    }
}



// import React from 'react';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';

// const Address = () => (
//   <Card>
//     <CardHeader
//       title="URL Avatar"
//       subtitle="Subtitle"
//       avatar="images/jsa-128.jpg"
//     />
//     <CardMedia
//       overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
//     >
//       <img src="/static/img/yezlogo.png" alt="" />
//     </CardMedia>
//     <CardTitle title="Card title" subtitle="Card subtitle" />
//     <CardText>
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//       Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi
//     </CardText>
//     <CardActions>
//       <FlatButton label="Action1" />
//       <FlatButton label="Action2" />
//     </CardActions>
//   </Card>
// );

// export default Address;
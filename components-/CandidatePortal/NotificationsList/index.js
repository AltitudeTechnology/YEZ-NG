import React, { Fragment } from 'react'
import { Dropdown, MenuItem } from 'react-bootstrap';
import CustomToggle from './CustomToggle';
import CustomMenu from './CustomMenu';

export default class NotificationsList extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <Dropdown id="dropdown-custom-menu">
      <CustomToggle bsRole="toggle">Custom toggle</CustomToggle>

      <CustomMenu bsRole="menu">
        <MenuItem eventKey="1">Red</MenuItem>
        <MenuItem eventKey="2">Blue</MenuItem>
        <MenuItem eventKey="3" active>
          Orange
        </MenuItem>
        <MenuItem eventKey="1">Red-Orange</MenuItem>
      </CustomMenu>
    </Dropdown>
    );
  }
}

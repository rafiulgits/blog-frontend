import React from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import UserThumb from "../static/images/user.png";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    const userItems = (
      <MDBNavbarNav right>
        <MDBNavItem>
          <MDBNavLink to="#">
            <strong style={{ whiteSpace: "nowrap" }}>
              <i className="fas fa-feather-alt"></i> Publish article
            </strong>
          </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBDropdown>
            <MDBDropdownToggle nav caret>
              <img src={UserThumb} alt="user" />
            </MDBDropdownToggle>
            <MDBDropdownMenu className="dropdown-default">
              <MDBDropdownItem className="font-weight-bold" href="/account">
                {this.props.user ? this.props.user.name : "First Name"}
              </MDBDropdownItem>
              <MDBDropdownItem className="font-weight-bold" href="#!">
                Logout
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavItem>
      </MDBNavbarNav>
    );

    const guestItems = (
      <MDBNavbarNav right>
        <MDBNavItem>
          <MDBNavLink to="/login">
            <strong> login</strong>
          </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink to="#">
            <strong> Signup</strong>
          </MDBNavLink>
        </MDBNavItem>
      </MDBNavbarNav>
    );

    return (
      <div style={{ height: "60px" }}>
        <MDBNavbar color="black" dark expand="md" fixed="top">
          <MDBNavbarBrand href="/">
            <strong>Blogger</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.onClick} />
          <MDBCollapse
            className="font-weight-bold"
            isOpen={this.state.collapse}
            navbar
          >
            <MDBNavbarNav center="true">
              <MDBNavItem>
                <form className="form-inline" action="search">
                  <input
                    className="form-control mr-2"
                    placeholder="Find article"
                  />
                  <MDBBtn
                    type="submit"
                    color="white"
                    className="btn-md mr-0 ml-0"
                  >
                    Search
                  </MDBBtn>
                </form>
              </MDBNavItem>
            </MDBNavbarNav>
            {this.props.isAuthenticated ? userItems : guestItems}
            {userItems}
          </MDBCollapse>
        </MDBNavbar>
      </div>
    );
  }
}

export default Navbar;

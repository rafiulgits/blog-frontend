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

  authenticatedItems() {
    return (
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
                Profile
              </MDBDropdownItem>
              <MDBDropdownItem className="font-weight-bold" href="/logout">
                Logout
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavItem>
      </MDBNavbarNav>
    );
  }

  anonymousItems() {
    return (
      <MDBNavbarNav right>
        <MDBNavItem>
          <MDBNavLink to="/login">
            <strong> login</strong>
          </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink to="/signup">
            <strong> Signup</strong>
          </MDBNavLink>
        </MDBNavItem>
      </MDBNavbarNav>
    );
  }

  getNavItems() {
    if (localStorage.getItem("auth")) {
      return this.authenticatedItems();
    }
    return this.anonymousItems();
  }

  render() {
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
            {this.getNavItems()}
          </MDBCollapse>
        </MDBNavbar>
      </div>
    );
  }
}

export default Navbar;

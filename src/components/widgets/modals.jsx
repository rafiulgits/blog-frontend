import React from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import PropTypes from "prop-types";

class AlertModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    okText: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,
    onOkClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    body: PropTypes.string,
    color: PropTypes.string
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div className="d-inline-block">
        <MDBBtn
          className={this.props.className}
          color={this.props.color}
          onClick={this.toggle}
        >
          {this.props.name}
        </MDBBtn>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
          <MDBModalHeader toggle={this.toggle}>
            {this.props.title}
          </MDBModalHeader>
          <MDBModalBody>{this.props.body}</MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle}>
              {this.props.cancelText}
            </MDBBtn>
            <MDBBtn
              color="primary"
              onClick={event => {
                this.setState({ modal: false });
                this.props.onOkClick(event);
              }}
            >
              {this.props.okText}
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  }
}

export { AlertModal };

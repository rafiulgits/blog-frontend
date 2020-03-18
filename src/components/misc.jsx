import React from "react";
import { default as LoaderLib } from "react-loader-spinner";
import PropTypes from "prop-types";
import NotFoundImage from "../static/images/404.svg";
import ForbiddenImage from "../static/images/angry.svg";
import { MDBNotification } from "mdbreact";

const Loader = props => {
  return (
    <div className="flex-center mt-5">
      <LoaderLib type="ThreeDots" color="#000000" height={120} width={120} />
    </div>
  );
};

const NotFound = props => {
  return (
    <div className="mt-5">
      <div className="flex-center">
        <img src={NotFoundImage} height="200" width="200" alt="404" />
      </div>
      <h1 className="text-center d-block">Not Found</h1>
    </div>
  );
};

const Forbidden = props => {
  return (
    <div className="mt-5">
      <div className="flex-center">
        <img src={ForbiddenImage} height="200" width="200" alt="404" />
      </div>
      <h1 className="text-center d-block">Who are you?</h1>
    </div>
  );
};

const Notification = props => {
  return (
    <MDBNotification
      show
      fade
      iconClassName="text-primary"
      title={props.title}
      message={props.message}
      text={props.text}
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        zIndex: 9999
      }}
    />
  );
};

Notification.prototype = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  text: PropTypes.string
};

export { Loader, NotFound, Forbidden, Notification };

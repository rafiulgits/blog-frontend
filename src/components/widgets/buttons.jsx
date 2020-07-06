import React from "react";
import PropTypes from "prop-types";

const Button = props => {
  let className = "btn";
  if (props.disabled) {
    className = `${className} disabled`;
  }
  return (
    <button
      className={`${className} ${props.className}`}
      style={{ ...props.style }}
      onClick={props.onClick}
      onSubmit={props.onSubmit}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

Button.prototype = {
  className: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
  onClick: PropTypes.func,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool
};

const configSpinnerClass = props => {
  let className = "spinner-border";
  if (props.spinType) {
    if (props.spinType === "grow") {
      className = "spinner-grow";
      if (props.smallSpin) {
        className = `${className} spinner-grow-sm`;
      }
    } else {
      if (props.smallSpin) {
        className = `${className} spinner-border-sm`;
      }
    }
  } else {
    if (props.smallSpin) {
      className = `${className} spinner-border-sm`;
    }
  }
  return className;
};

const SpinnerButton = props => {
  const className = configSpinnerClass(props);
  return (
    <Button
      className={`${props.className}`}
      style={{ ...props.style }}
      onClick={props.onClick}
      onSubmit={props.onSubmit}
    >
      <div className={className}></div>
      {props.children}
    </Button>
  );
};

SpinnerButton.prototype = {
  smallSpin: PropTypes.bool,
  spinType: PropTypes.string
};

export { Button, SpinnerButton };

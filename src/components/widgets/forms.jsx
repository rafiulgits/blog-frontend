import React from "react";
import PropTypes from "prop-types";
import style from "./styles/Forms.module.css";

const TextInput = props => {
  return (
    <div className={style.textinput}>
      <label>{props.label}</label>
      <input
        className="form-control"
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        minLength={props.minLength}
        maxLength={props.maxLength}
        required={props.required}
      />
    </div>
  );
};

TextInput.prototype = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
  required: PropTypes.bool
};

const CheckBox = props => {
  return (
    <div className="custom-control custom-checkbox">
      <input
        id={props.id}
        type="checkbox"
        className="custom-control-input"
        onChange={props.onChange}
      />
      <label htmlFor={props.id} className="custom-control-label">
        {props.label}
      </label>
    </div>
  );
};

CheckBox.prototype = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool
};

const Select = props => {
  return (
    <select
      onChange={props.onChange}
      className={`form-control ${props.className}`}
      style={{ ...props.style }}
    >
      {props.options.map(item => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

Select.prototype = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array
};

export { TextInput, CheckBox, Select };

import React from "react";

const FormGroup = ({ name, placeholder, value, error, icon, type, change }) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        {icon !== "" ? (
          <span className="input-group-text" id="basic-addon1">
            <i className={icon}></i>
          </span>
        ) : null}
      </div>
      <input
        type={type}
        className={`form-control ${error ? "is-invalid" : ""}`}
        name={name}
        placeholder={placeholder}
        onChange={change}
        value={value}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
};

export default FormGroup;

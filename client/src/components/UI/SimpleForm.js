import React, { Component } from "react";

class SimpleForm extends Component {
  render() {
    const add = <i className="fas fa-plus-circle"></i>;
    return (
      <div
        className="container shadow rounded mt-4 collapse"
        id={this.props.id}
      >
        <form className="form">
          <input
            type={this.props.title}
            className=""
            name="chapName"
            onChange={this.props.onChange}
            style={{
              borderTopStyle: "hidden",
              background: "transparent",
              borderLeftStyle: "hidden",
              borderRightStyle: "hidden",
              borderBottomColor: " #870000",
              width: "100%",
              marginTop: "2rem",
            }}
          />
          <button
            data-toggle="popover"
            title="Add chapter"
            type="button"
            style={{
              background: "transparent",
              borderStyle: "hidden",
              padding: "1rem",
            }}
            onClick={this.props.click}
          >
            {add}
          </button>
        </form>
      </div>
    );
  }
}

export default SimpleForm;

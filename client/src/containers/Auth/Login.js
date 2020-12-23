import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./css/Login.css";
import { createProfile, logInUser } from "../../store/actions/authAction";

import InputGroup from "../../components/UI/InputGroup/InputGroup";
import { createLibrary } from "../../store/actions/booksAction";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
      isAuthenticated: false,
    };
  }

  componentDidUpdate() {
    // Typical usage (don't forget to compare props):
    if (this.props.auth.isAuthenticated) {
      if (this.props.location.state) {
        if (this.props.location.state.new) {
          this.props.createlibrary();
          this.props.addprofile();
        }
      }
      this.props.history.push("/dashboard");
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(this.props.auth);
  //   if (nextProps.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  //   // if (nextProps.errors) {
  //   //   this.setState({ errors: nextProps.errors });
  //   // }
  // }

  submitHandle = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.userLogin(userData, this.props.history);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    if (this.props.auth.isAuthenticated) {
      // if (this.props.location.state.new) {
      //   this.props.addprofile();
      // }
      <Redirect to="/dashboard" />;
    }

    const errors = this.props.auth.errors
      ? this.props.auth.errors
      : { nothing: "hhh" };
    return (
      <div id="myModal">
        <div className="modal-dialog modal-login">
          <div className="modal-content">
            <div className="model-header">
              {/* <div className="avatar">
                                <img src={avatar} alt="Avatar" />
                            </div> */}
              <h4 className="modal-title">Login</h4>
            </div>
            <div className="modal-body">
              <form action="">
                <InputGroup
                  type="email"
                  placeholder="Email"
                  icon="fas fa-at"
                  value=""
                  change={this.onChange}
                  error={errors.email}
                  name="email"
                />

                <InputGroup
                  type="password"
                  placeholder="Password"
                  icon="fas fa-key"
                  value="password"
                  change={this.onChange}
                  error={errors.password}
                  name="password"
                />
                <div className="input-group loginDiv mb-3">
                  <button
                    className="btn btn-primary btn-lg btn-block login-btn"
                    onClick={this.submitHandle}
                  >
                    login
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <a href="/">Forgot Password?</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  userLogin: (userData, history) => dispatch(logInUser(userData, history)),
  addprofile: () => dispatch(createProfile()),
  createlibrary: () => dispatch(createLibrary()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

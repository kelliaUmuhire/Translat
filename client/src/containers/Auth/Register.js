import React, { Component } from "react";
import { connect } from "react-redux";

import "./css/Register.css";
import { registerUser } from "../../store/actions/authAction";

import InputGroup from "../../components/UI/InputGroup/InputGroup";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {},
    isAuthenticated: false,
  };

  //temp!!

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  // }

  componentDidUpdate() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  submitHandle = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.userRegi(newUser, this.props.history);

    // axios.post("/api/users/register", newUser)
    //     .then(res => this.props.history.push('/login'))
    //     .catch(err => (Object.keys(err)).length !== 0 ? this.setState({errors : err.response.data}) : this.setState({errors:{}}))
    // console.log(this.state.errors);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    let errors = this.props.auth.errors ? this.props.auth.errors : {};
    return (
      <div id="myModal">
        <div className="modal-dialog modal-register">
          <div className="modal-content">
            <div className="model-header">
              {/* <div className="avatar">
                                <img src={avatar} alt="Avatar" />
                            </div> */}
              <h4 className="modal-title">Register</h4>
            </div>
            <div className="modal-body">
              <form action="">
                {/* <div className="form-group">
                                <input type="text" className="form-control" name="name" placeholder="Username" onChange={this.onChange} />
                            </div> */}
                <InputGroup
                  name="name"
                  value="name"
                  placeholder="Username"
                  type="text"
                  icon=""
                  change={this.onChange}
                  error={errors.name}
                />
                <InputGroup
                  name="email"
                  value="email"
                  placeholder="example@mail.com"
                  type="email"
                  icon=""
                  change={this.onChange}
                  error={errors.email}
                />
                <InputGroup
                  name="password"
                  value="password"
                  placeholder="Password"
                  type="password"
                  icon=""
                  change={this.onChange}
                  error={errors.password}
                />
                <InputGroup
                  name="password2"
                  value="password2"
                  placeholder="Confirm Password"
                  type="password"
                  icon=""
                  change={this.onChange}
                  error={errors.password2}
                />
                {/* <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    onChange={this.onChange}
                  />
                </div> */}
                {/* <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    name="password2"
                    placeholder="Confirm Password"
                    onChange={this.onChange}
                  />
                </div> */}
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-lg btn-block register-btn"
                    onClick={this.submitHandle}
                  >
                    register
                  </button>
                </div>
              </form>
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
  userRegi: (newUser, history) => dispatch(registerUser(newUser, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

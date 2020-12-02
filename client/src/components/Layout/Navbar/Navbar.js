import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { MDBContainer } from "mdbreact";
import axios from "axios";

import "./Navbar.css";
import { logOut } from "../../../store/actions/authAction";
// import Login from '../../Auth/Login'

class Navbar extends Component {
  state = {
    search: "",
  };

  onChange = (e) => {
    this.setState({ search: e.target.value });
  };

  handleOnPress = (e) => {
    // e.preventDefault();
    if (e.key === "Enter") {
      this.props.history.push({
        pathname: "searchresult",
        state: { searchvalue: this.state.search },
      });
    }
  };

  searchWord = (e) => {
    console.log("Clicked");
  };
  render() {
    let display = this.props.isAuthenticated ? (
      <nav
        className="navbar navbar-expand-lg shadow-sm fixed-top"
        id="mainNav"
        style={{ background: "#fff" }}
      >
        <MDBContainer>
          <a className="navbar-brand js-scroll-trigger" href="/">
            TransBase
          </a>
          <button
            className="navbar-toggler navbar-toggler-right font-weight-bold text-white rounded"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              {/* <li className="nav-item mx-lg-1 drop md-form"> */}
              {/** Search form */}
              {/* <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Search"
                  aria-label="Search"
                /> */}
              {/* </li> */}
              {/* <li className="nav-item mx-0 mx-lg-1">
                <Link
                  className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                  to="/"
                >
                  Home
                </Link>
              </li> */}
              {/* <form
                className="form-inline my-2 my-lg-0 md-form"
              > */}
              <span className="md-form">
                <i className="fas fa-search" aria-hidden="true"></i>
                <input
                  className=" mr-sm-2 ml-3"
                  type="text"
                  placeholder="Search"
                  onChange={this.onChange}
                  onKeyPress={this.handleOnPress}
                />
              </span>
              {/* </form> */}
              <li className="nav-item mx-0 mx-lg-1">
                <Link
                  className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                  to="/browserbooks"
                >
                  Browser
                </Link>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <Link
                  className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                  to={`/library/${this.props.user.name}`}
                >
                  Book Shelf
                </Link>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <Link
                  className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                  to="/dashboard"
                >
                  Your stories
                </Link>
              </li>
              <li className="nav-item mx-lg-1 drop">
                <a
                  className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                  href="#collapseOptions"
                  data-toggle="collapse"
                  aria-expanded={false}
                  //   aria-target="collapseOptions"
                >
                  <i
                    className="fas fa-user ml-1"
                    style={{ fontSize: "2rem" }}
                  ></i>
                </a>
                <div
                  id="collapseOptions"
                  className="shadow border bg-light collapse"
                >
                  <ul>
                    <li className="option mb-2 ">
                      <Link to={`/profile/${this.props.user.name}`}>
                        Profile
                      </Link>
                    </li>
                    <li className="option mb-2">
                      <i className="fas fa-bell"></i>Notifications
                    </li>
                    <li
                      className="option mb-2"
                      onClick={() => {
                        this.props.logout();
                        this.props.history.push({
                          pathname: "/login",
                        });
                        return 0;
                      }}
                      title="Sign out"
                    >
                      <i className="fas fa-sign-out-alt"></i>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </MDBContainer>
      </nav>
    ) : (
      <nav
        className="navbar navbar-expand-lg shadow-sm fixed-top"
        id="mainNav"
        style={{ background: "#1c1c1c" }}
      >
        <MDBContainer>
          <a className="navbar-brand js-scroll-trigger" href="/">
            TransBase
          </a>
          <button
            className="navbar-toggler navbar-toggler-right font-weight-bold bg-dark text-white rounded"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mx-0 mx-lg-1">
                <Link
                  className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <Link
                  className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                  to="/browserbooks"
                >
                  Browser
                </Link>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <Link
                  className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <Link
                  className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </MDBContainer>
      </nav>
    );
    return <div>{display}</div>;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));

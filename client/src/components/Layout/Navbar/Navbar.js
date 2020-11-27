import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { MDBContainer } from "mdbreact";

import "./Navbar.css";
import { logOut } from "../../../store/actions/authAction";
// import Login from '../../Auth/Login'

class Navbar extends Component {
  render() {
    let display = this.props.isAuthenticated ? (
      <nav
        className="navbar navbar-expand-lg fixed-top"
        id="mainNav"
        style={{ background: "#e23e57" }}
      >
        <MDBContainer>
          <a className="navbar-brand js-scroll-trigger" href="#page-top">
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
            Menu <i className="fas fa-bars"></i>
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
                  to="/library"
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
                  <i class="fas fa-user ml-1" style={{ fontSize: "2rem" }}></i>
                </a>
                <div id="collapseOptions" className="shadow border bg-light">
                  <ul>
                    <li className="option mb-2 ">
                      <Link to={`/profile/${this.props.user.name}`}>
                        Profile
                      </Link>
                    </li>
                    <li className="option mb-2">temp</li>
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
                      <i class="fas fa-sign-out-alt"></i>
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
        style={{ background: "#e23e57" }}
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
            Menu <i className="fas fa-bars"></i>
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

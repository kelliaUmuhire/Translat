import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Book from "../../../Book/Book";
// import temp2 from "./temp2.jpg";

import "./ProfileHeader.css";
class ProfileHeader extends Component {
  state = {
    library: 0,
    tempBooks: [],
  };
  async componentDidMount() {
    // console.log(this.props.library);
    // console.log("Mounted");
    // let temp = [];
    // if (this.props.name) {
    //   axios({
    //     method: "get",
    //     url: `api/library/getbyname/${this.props.name}`,
    //     baseURL: "http://localhost:5000/",
    //   })
    //     .then((res) => {
    //       // console.log(res.data);
    //       // temp.push(res.data);
    //       // this.setState({ tempBooks: temp });
    //       this.setState({ library: res.data });
    //       // if (res.data.books) {
    //       // res.data.books.map((book) => {

    //       // });
    //       // }
    //       res.data.books.map((book) => {
    //         axios({
    //           method: "get",
    //           url: `api/books/getone/${book}`,
    //           baseURL: "http://localhost:5000/",
    //         })
    //           .then((res) => {
    //             console.log(res.data);
    //             // temp.push(res.data);
    //           })
    //           .catch((err) => console.log(err));
    //       });
    //     })
    //     .catch((err) => console.log(err));
    // } else {
    //   console.log(this.props.name);
    // }

    let temp = [];
    console.log(this.props.library);
    if (this.props.library.books) {
      await this.props.library.books.map((book) => {
        // console.log(this.props.library);
        axios({
          method: "get",
          url: `/api/books/getone/${book.bookId}`,
        })
          .then((res) => {
            if (res.data !== "not") {
              temp.push(res.data);
              this.setState({ tempBooks: temp });
            } else {
              console.log("Null");
            }
          })
          .catch((err) => console.log(err));
        return 0;
      });
    }
    console.log(temp);
    return 0;

    // this.setState({ tempBooks: temp });
  }

  async componentDidUpdate() {
    console.log("Updated");
    let temp = [];
    if (this.state.tempBooks.length < 1) {
      if (this.props.library.books) {
        await this.props.library.books.map((book) => {
          axios({
            method: "get",
            url: `/api/books/getone/${book}`,
          })
            .then((res) => {
              if (res.data !== "not") {
                temp.push(res.data);
                this.setState({ tempBooks: temp });
              } else {
                console.log("Null");
              }
            })
            .catch((err) => console.log(err));
          return 0;
        });
      }
    }
  }

  editProfile = () => {
    this.props.history.push({ pathname: "/edit-profile" });
  };

  getFileName = (str) => {
    if (str === null || str === undefined) {
      return 0;
    }
    return str.split("\\").pop().split("/").pop();
  };

  render() {
    // if (library !== 0) {
    //   books = library.books.map((book) => {
    //     getDetails(book);
    //     return (
    //       <Book
    //         key={tempBook._id}
    //         url={tempBook.bookCover}
    //         book_url={tempBook.bookURL}
    //         bookId={tempBook._id}

    return (
      <div className="container ProfileHeader">
        <div className="row">
          <div className="col-lg-12 col-sm-12 col-12 main-section">
            <div className="row">
              <div className="col-lg-12 col-sm-12 col-12 profile-header">
                <div className="social">
                  <div className="col-lg-12 col-sm-12 col-12">
                    <a href={this.props.social.facebook} target="_blank">
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a href={this.props.social.twitter} target="_blank">
                      <i className="fab fa-twitter-square"></i>
                    </a>
                    <a href={this.props.social.youtube} target="_blank">
                      <i className="fab fa-youtube"></i>
                    </a>
                    <a href={this.props.social.instagram} target="_blank">
                      <i class="fab fa-instagram"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row user-detail">
              <div className="col-lg-12 col-sm-12 col-12">
                <img
                  src={
                    this.props.picture !== "default"
                      ? "http://localhost:5000/profilePics/" +
                        this.getFileName(this.props.picture)
                      : "https://pngimg.com/uploads/tom_and_jerry/tom_and_jerry_PNG34.png"
                  }
                  alt="avatar"
                  className="rounded-circle img-thumbnail"
                />
                {this.props.isAuthenticated &&
                this.props.userId === this.props.user.id ? (
                  <div
                    className="edit rounded-circle text-center"
                    onClick={this.editProfile}
                  >
                    <i class="fas fa-pen"></i>
                  </div>
                ) : null}
                <h5>@{this.props.name}</h5>
                <p>
                  <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
                  {this.props.address}
                </p>
                <hr />
                {/* <a href="/nowhere" className="btn btn-sm">
                  Follow
                </a>
                <a href="/nowhere" className="btn btn-sm">
                  Send Message
                </a> */}
                <strong>Contact</strong>
                <div>
                  <div>
                    <span style={{ color: "#222831" }}> Email: </span>
                    <span style={{ color: "#30475e" }}>{this.props.email}</span>
                  </div>
                  <div>
                    <span style={{ color: "#222831" }}> Phone Number: </span>
                    <span style={{ color: "#30475e" }}>{this.props.phone}</span>
                  </div>
                </div>
                <hr />
                <span>
                  <strong> Library</strong>
                </span>
                <div className="bookholder row" style={{ height: "80%" }}>
                  {this.state.tempBooks.length !== 0 ? (
                    this.state.tempBooks.map((book) => (
                      <Book
                        key={book._id}
                        url={book.bookCover}
                        book_url={book.bookURL}
                        bookId={book._id}
                        readonly={true}
                      />
                    ))
                  ) : (
                    <div>
                      No books in the library
                      {/* <i className="fas fa-spinner fa-spin"></i> */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(withRouter(ProfileHeader));

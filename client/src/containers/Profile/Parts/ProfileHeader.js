import React, { Component } from "react";
import axios from "axios";

import Book from "../../Book/Book";
// import temp2 from "./temp2.jpg";

import "./ProfileHeader.css";
class ProfileHeader extends Component {
  state = {
    library: 0,
    tempBooks: [],
  };
  componentDidMount() {
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
    if (this.props.library.books) {
      this.props.library.books.map((book) => {
        axios({
          method: "get",
          url: `/api/books/getone/${book}`,
        })
          .then((res) => {
            console.log(res.data);
            temp.push(res.data);
            this.setState({ tempBooks: temp });
          })
          .catch((err) => console.log(err));
        return 0;
      });
      return temp;
    }

    // this.setState({ tempBooks: temp });
  }

  componentDidUpdate() {
    console.log(this.state.tempBooks);
  }

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
                    <a href="/nowhere">
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a href="/nowhere">
                      <i className="fab fa-twitter-square"></i>
                    </a>
                    <a href="/nowhere">
                      <i className="fab fa-youtube"></i>
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
                      ? this.props.picture
                      : "https://pngimg.com/uploads/tom_and_jerry/tom_and_jerry_PNG34.png"
                  }
                  alt="avatar"
                  className="rounded-circle img-thumbnail"
                />
                <h5>@{this.props.name}</h5>
                <p>
                  <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
                  {this.props.location}
                </p>
                <hr />
                <a href="/nowhere" className="btn btn-sm">
                  Follow
                </a>
                <a href="/nowhere" className="btn btn-sm">
                  Send Message
                </a>

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
                      <i class="fas fa-spinner fa-spin"></i>
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

export default ProfileHeader;

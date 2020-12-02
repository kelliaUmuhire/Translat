import React, { Component } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
// import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import _ from "lodash";

import "./Book.css";
import { addBookToLibrary, removeBook } from "../../store/actions/booksAction";

// import { data } from 'node-persist';

class Book extends Component {
  constructor(props) {
    super(props);
    this.deleteBook = this.deleteBook.bind(this);
    this.addToLibrary = this.addToLibrary.bind(this);
  }
  getFileName = (str) => {
    if (str === null || str === undefined) {
      return 0;
    }
    return str.split("\\").pop().split("/").pop();
  };

  getUrl = () => {
    let fullDetails = {};
    let bookUrl = this.getFileName(this.props.book_url);

    fullDetails.pathname = "/readbook";
    fullDetails.state = {
      book: "http://localhost:5000/book/" + bookUrl,
    };
    return fullDetails;
  };

  deleteBook() {
    //add confirmation
    // if(window.confirm("You sure?!")){
    // confirmAlert({
    //   title: "Confirm to submit",
    //   message: "Are you sure to do this.",
    //   buttons: [
    //     {
    //       label: "Yes",
    //       onClick: () => alert("Click Yes"),
    //     },
    //     {
    //       label: "No",
    //       onClick: () => alert("Click No"),
    //     },
    //   ],
    // });

    axios.post(`api/books/deletebook/${this.props.bookId}`).then((res) => {
      //  console.log("DOneee!!")
      this.props.remove(this.props.bookId);
    });
    // }
  }

  addToLibrary = () => {
    axios
      .post(
        `api/library/${this.props.bookId}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((res) => {
        this.props.addtoLibrary(this.props.bookId);
        this.props.notify("Book added to your library", "success");
      })
      .catch((err) => console.log(err));
  };
  render() {
    let newurl = this.getFileName(this.props.url);
    // let fullLink;
    // if(bookUrl === 'db') {

    // }
    let addtolib = null;
    let menu = (
      <div>
        <Link to={this.getUrl()}>
          <i className="fas fa-book-open"></i>
        </Link>
        {this.props.readonly ? null : (
          <div
            className="card-text btnicon pr-1 pl-1"
            onClick={this.deleteBook}
            data-toggle="popover"
            data-content="Delete book"
            data-placement="top"
            data-trigger="hover"
          >
            <i className="far fa-trash-alt"></i>
          </div>
        )}
      </div>
    );

    if (this.props.readonly && this.props.library) {
      let index = this.props.library.books
        ? this.props.library.books.indexOf(this.props.bookId)
        : null;
      if (index === -1) {
        addtolib = (
          <div
            className="card-text  btnicon pr-1 pl-1"
            onClick={this.addToLibrary}
            title="Add to library"
          >
            <i className="fas fa-plus"></i>
          </div>
        );
      }
    }
    return (
      <div className="book-wrap">
        <div className="book">
          <div className="shadow"></div>
          <div className="body"></div>
          <div className="cover">
            <Link to={this.getUrl()}>
              <img
                src={"http://localhost:5000/bookCover/" + newurl}
                alt="book-cover"
              />
            </Link>
            <div className="edge">
              <div className="edge-border"></div>
            </div>
          </div>
          <div className="options card rounded-left align-center">
            {menu}
            {addtolib}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  remove: (bookId) => dispatch(removeBook(bookId)),
  addtoLibrary: (bookId) => dispatch(addBookToLibrary(bookId)),
});

const mapStateToProps = (state) => ({
  library: state.books.library,
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Book));

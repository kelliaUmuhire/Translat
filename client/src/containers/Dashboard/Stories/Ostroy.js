import React, { Component } from "react";
import { connect } from "react-redux";

import Book from "../../Book/Book";
import BookUpload from "../Upload/BookUpload";
import { getUserBooks } from "../../../store/actions/booksAction";
import { Link } from "react-router-dom";
import "./Ostroy.css";

class Ostroy extends Component {
  state = {
    books: "",
    book: null,
  };

  componentDidMount() {
    this.props.getbooks();
    if (this.props.books !== undefined) {
      this.setState({ books: this.props.books });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.books.books !== this.props.books) {
      this.setState({ books: nextProps.books.books });
    }
  }

  render() {
    let newBooks;
    this.props.books !== undefined
      ? (newBooks = [...this.props.books])
      : (newBooks = []);
    //temporary
    let showBooks = newBooks.map((book) => (
      <Book
        key={book._id}
        url={book.bookCover}
        book_url={book.bookURL}
        bookId={book._id}
        readonly={false}
      />
    ));
    // console.log(showBooks)

    const style = {
      marginTop: "30px",
    };
    return (
      <div className="stories">
        <div className="text-center" style={style}>
          <h2 className="head text-center mb-5">Your stories</h2>
          <button
            className="text-center btn mr-3"
            type="button"
            data-toggle="collapse"
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <i className="fas fa-upload"></i>
          </button>
          {/*** Upload form ** */}
          <div id="collapseExample" className="collapse">
            <BookUpload />
          </div>
          {/*** Upload form ending** */}
          <Link
            className="text-center btn mr-3 ml-2"
            title="Edit globaly"
            to="/userdash"
          >
            <i class="fas fa-edit float-right mr-4"></i>
          </Link>
        </div>
        {/** Render books covers */}
        <div className="container">
          <div className="row">{showBooks}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  books: state.books.books,
});

const mapDispatchToProps = (dispatch) => ({
  getbooks: () => dispatch(getUserBooks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ostroy);

import React, { Component } from "react";
import axios from "axios";
import Book from "../Book/Book";

class Browser extends Component {
  state = {
    books: [],
  };
  componentDidMount() {
    axios
      .get("api/books/browserbooks")
      .then((res) => this.setState({ books: res.data }))
      .catch((err) => console.log(err));
  }
  render() {
    let display = this.state.books.map((book) => (
      <Book
        key={book._id}
        url={book.bookCover}
        book_url={book.bookURL}
        bookId={book._id}
        readonly={true}
      />
    ));
    return (
      <div className="container">
        <div className="row">{display}</div>
      </div>
    );
  }
}

export default Browser;

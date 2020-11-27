import React, { Component } from "react";
import Book from "../Book/Book";
import axios from "axios";
import { connect } from "react-redux";
import { getLibrary } from "../../store/actions/booksAction";
// import authReducer from "../../store/reducers/authReducer";

class Library extends Component {
  state = {
    userLibrary: null,
    errors: null,
    tempBooks: [],
  };
  componentDidMount() {
    this.props.getlibrary(this.props.user.id);
    // console.log(this.props.library);
    let temp = [];
    if (this.props.library)
      this.props.library.books.map((book) => {
        axios
          .get(`api/books/getone/${book}`)
          .then((res) => {
            temp.push(res.data);
          })
          .catch((err) => console.log(err));
        return 0;
      });
    // let index = temp.findIndex((x) => Object.keys(x).length === 0);
    // let temp2 = temp.filter((x) => indexOf(x) !== index);
    this.setState({ tempBooks: temp });
  }

  getDetails = (bookId) => {
    let data = [];
    axios
      .get(`api/books/getone/${bookId}`)
      .then((res) => {
        data.push(res.data.bookCover);
        data.push(res.data.bookURL);
        return 0;
      })
      .catch((err) => console.log(err));
    console.log(data);
    return data;
  };
  render() {
    // let books;
    // this.state.userLibrary !== null
    //   ? (books = [...this.state.userLibrary.books])
    //   : (books = []);
    //temporary
    // if (this.state.userLibrary !== null) {
    //   this.state.userLibrary.books.map((book) => {
    //     let tempData = this.getDetails(book);
    //     console.log(tempData);
    //   });
    // }
    // let showBooks = books.map((book) => {
    //   const tempData =
    //     this.getDetails(book) !== null ? this.getDetails(book) : {};
    //   console.log(tempData.book);
    //   //   console.log(this.getDetails(book));
    //   //   return <div>Hold on</div>;
    //   return (
    //     <Book
    //       key={book}
    //       url={tempData.bookCover}
    //       book_url={tempData.bookURL}
    //       bookId={book}
    //     />
    //   );
    // });
    let showBooks = null;
    // if (this.props.library !== null) {
    // // console.log(this.props.library.books);
    // showBooks = this.props.library.books.map((book) => {
    //   let temp = null;
    //   axios
    //     .get(`api/books/getone/${book}`)
    //     .then((res) => (temp = <div>{book}</div>))
    //     .catch((err) => console.log(err));
    //   return temp;
    // });

    //need loader///
    showBooks = this.state.tempBooks.map((book) => (
      <Book
        key={book._id}
        url={book.bookCover}
        book_url={book.bookURL}
        bookId={book._id}
        readonly={true}
      />
    ));

    console.log(showBooks);
    // console.log(this.state.tempBooks);
    // }

    return (
      <div className="container">
        {/* <div className="row">{showBooks}</div> */}
        {/* <i className="fas fa-spinner fa-pulse"></i> */}
        Hold on
        {/* <div className="row">
          {this.state.userLibrary !== null
            ? this.state.userLibrary.books.map((book) => {
                this.getDetails(book);
                console.log(this.getDetails(book));
                return <div>Hold on</div>;
              })
            : "nothing"}
        </div> */}
        <div className="row">{showBooks}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  library: state.books.library,
});

const mapDispatchToProps = (dispatch) => ({
  getlibrary: (userId) => dispatch(getLibrary(userId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Library);

import React, { Component } from "react";
import Book from "../../Book/Book";
import axios from "axios";
import { connect } from "react-redux";
import { getLibrary } from "../../../store/actions/booksAction";
// import authReducer from "../../store/reducers/authReducer";

import "./Library.css";

class Library extends Component {
  state = {
    userLibrary: null,
    errors: null,
    tempBooks: [],
  };
  componentDidMount() {
    let par = this.props.match.params.username;
    this.props.getlibrary(par);
    console.log(this.props.library);
    let temp = [];
    if (this.props.library) {
      this.props.library.books.map((book) => {
        axios
          .get(`/api/books/getone/${book.bookId}`)
          .then((res) => {
            console.log(res.data);
            temp.push(res.data);
          })
          .catch((err) => console.log(err));
        return 0;
      });
    }
    // let index = temp.findIndex((x) => Object.keys(x).length === 0);
    // let temp2 = temp.filter((x) => indexOf(x) !== index);
    this.setState({ tempBooks: temp });
    this.setState({ userLibrary: this.props.library });
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

  goToProfile = (userId) => {
    axios
      .get(`/api/users/getuser/${userId}`)
      .then((res) => this.props.history.push(`/profile/${res.data.name}`))
      .catch((err) => console.log(err));
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
    //need loader///
    showBooks = this.state.tempBooks.map((book) => {
      // this.getName(book.userId)
      return (
        <div className="row" key={book._id}>
          <Book
            key={book._id}
            url={book.bookCover}
            book_url={book.bookURL}
            bookId={book._id}
            readonly={true}
            inLibrary={true}
            translate={true}
          />
          <div className="collapse behind" id={`behind${book._id}`}>
            <div>
              <ul className="list-group">
                <li
                  className="list-group-item d-flex justify-content-between align-items-center author"
                  onClick={() => this.goToProfile(book.userId)}
                >
                  <span className="title">Author</span>
                  <span value="author" name="author">
                    {book.author}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Book name
                  <span value="title" name="title">
                    {book.title}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Book language
                  <span
                    onDoubleClick={this.listenForDoubleClick}
                    value="bookLanguage"
                    name="bookLanguage"
                    onInput={this.saveChanges}
                    suppressContentEditableWarning={true}
                  >
                    {book.bookLanguage}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong> Translation language</strong>
                  <span className="">{book.translateLang}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Date
                  <span className="">{book.date}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    });

    // console.log(showBooks);
    // console.log(this.state.tempBooks);
    // }

    return (
      <div className="container Library">
        {/* <div className="row">{showBooks}</div> */}
        {/* <i className="fas fa-spinner fa-pulse"></i> */}
        This is your library
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
  getlibrary: (username) => dispatch(getLibrary(username)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Library);

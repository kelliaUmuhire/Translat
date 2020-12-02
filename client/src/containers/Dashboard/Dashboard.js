import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import { connect } from "react-redux";
import NotificationSystem from "react-notification-system";
import cx from "classnames";

import "./Dashboard.css";
import {
  get_books,
  removeBook,
  updateBook,
  updateBooks,
} from "../../store/actions/booksAction";

class Dashboard extends Component {
  state = {
    books: [],
    errors: null,
    tempData: {},
    edit: false,
    holder: "",
    translate: false,
  };

  notificationSystem = React.createRef();

  componentDidMount() {
    this.props.getbooks();
    // console.log(this.props.books);
  }

  showNotification = (message, level) => {
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message: message,
      level: level,
      position: "br",
    });
  };

  deleteBook = (bookId) => {
    axios
      .post(`api/books/deletebook/${bookId}`)
      .then((res) => {
        //fix issuses
        this.showNotification("Book deleted", "warning");
      })
      .catch((err) => console.log(err));
  };
  publishBook = (bookId) => {
    axios
      .post(`api/books/publishbook/${bookId}`)
      .then((res) => {
        //fix issuses
        console.log("Temporarly reload needed");
        this.props.update(bookId, "published", true);
        this.showNotification("Book published!", "info");
      })
      .catch((err) => console.log(err));
  };

  listenForDoubleClick = (e) => {
    console.log(e.target.getAttribute("name"));
    console.log("Double clicked");
    this.setState({ edit: !this.state.edit });
  };

  saveChanges = (e) => {
    // console.log(e.target);
    this.setState({ holder: e.target.innerText });
  };

  onBlur = (bookId, e) => {
    //update book
    // console.log(e.target.getAttribute("name"));
    // console.log(bookId);
    console.log(this.state.holder);
    if (this.state.holder !== "") {
      axios
        .post("/api/books/updatename", {
          bookId: bookId,
          newvalue: this.state.holder,
          field: e.target.getAttribute("name"),
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }
    this.setState({ holder: "", edit: false });
  };

  checkboxChange = (bookId, e) => {
    axios
      .post("/api/books/updatename", {
        bookId: bookId,
        newvalue: e.target.checked,
        field: "translate",
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  render() {
    // console.log(this.props.books);
    let display = this.props.books
      ? this.props.books.map((book) => (
          <div key={book.bookId}>
            <button
              className="btn col-6 col-md-12"
              type="button"
              data-toggle="collapse"
              data-target={`#book${book._id}`}
              aria-expanded="false"
              aria-controls="chapters"
            >
              <span className="name">{book.title}</span>
              <span
                className="delete-button"
                onClick={() => this.deleteBook(book.bookId)}
              >
                <i className="float-right mr-2 far fa-trash-alt"></i>
              </span>
              {!book.published ? (
                <span
                  className="publish-button"
                  onClick={() => this.publishBook(book._id)}
                  title="Publish Book"
                >
                  <i className="float-right mr-5 fas fa-upload"></i>
                </span>
              ) : null}
            </button>
            <div id={`book${book._id}`} className="collapse">
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Author
                  <span
                    onDoubleClick={this.listenForDoubleClick}
                    contentEditable={this.state.edit}
                    value="author"
                    name="author"
                    onBlur={(e) => this.onBlur(book._id, e)}
                    onInput={this.saveChanges}
                    suppressContentEditableWarning={true}
                  >
                    {book.author}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Book name
                  <span
                    onDoubleClick={this.listenForDoubleClick}
                    contentEditable={this.state.edit}
                    value="title"
                    name="title"
                    onBlur={(e) => this.onBlur(book._id, e)}
                    onInput={this.saveChanges}
                    suppressContentEditableWarning={true}
                  >
                    {book.title}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Book language
                  <span
                    onDoubleClick={this.listenForDoubleClick}
                    contentEditable={this.state.edit}
                    value="bookLanguage"
                    name="bookLanguage"
                    onBlur={(e) => this.onBlur(book._id, e)}
                    onInput={this.saveChanges}
                    suppressContentEditableWarning={true}
                  >
                    {book.bookLanguage}
                  </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  On translation list
                  <span class="">
                    <input
                      type="checkbox"
                      name="translate"
                      value="translate"
                      defaultChecked={book.translate}
                      onChange={(e) => this.checkboxChange(book._id, e)}
                    />
                  </span>
                </li>
                <li
                  className={cx(
                    "list-group-item",
                    "d-flex",
                    "justify-content-between",
                    "align-items-center",
                    {
                      grey_bg: !book.translate,
                    }
                  )}
                >
                  Language for translation
                  <span
                    onDoubleClick={this.listenForDoubleClick}
                    contentEditable={this.state.edit}
                    value="translateLang"
                    name="translateLang"
                    onBlur={(e) => this.onBlur(book._id, e)}
                    onInput={this.saveChanges}
                    suppressContentEditableWarning={true}
                  >
                    {book.translate ? book.translateLang : "No language"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        ))
      : null;
    return (
      <div className="container Dashboard">
        <NotificationSystem ref={this.notificationSystem} />
        <h2>These are your stories for easy modification</h2>
        <div className="books">{display}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  books: state.books.dashBooks,
});

const mapDispatchToProps = (dispatch) => ({
  deletebook: (bookId) => dispatch(removeBook(bookId)),
  getbooks: () => dispatch(get_books()),
  update: (bookId, field, value) => dispatch(updateBook(bookId, field, value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

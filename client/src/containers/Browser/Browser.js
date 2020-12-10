import React, { Component } from "react";
import axios from "axios";
import Book from "../Book/Book";
import qs from "qs";
import NotificationSystem from "react-notification-system";
import cx from "classnames";

import "./Browser.css";
// import { isArray, isTypedArray } from "lodash";

class Browser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      translate: false,
      languages: [],
      new: false,
      name: "",
    };
    this.notificationSystem = React.createRef();
  }

  componentDidMount() {
    axios
      .get("api/books/browserbooks")
      .then((res) => this.setState({ books: res.data }))
      .catch((err) => console.log(err));
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handlePress = (e) => {
    if (e.key === "Enter") {
      axios
        .get(`api/books/searchbook/${this.state.name}`)
        .then((res) => this.setState({ books: res.data }))
        .catch((err) => console.log(err));
    }
  };

  setLanguage = (e) => {
    let index = this.state.languages.indexOf(e.target.value);
    let temp = [...this.state.languages];
    let word = "";

    if (index > -1) {
      temp.splice(index, 1);
      this.setState({ languages: temp });
    } else {
      temp.push(e.target.value);
      this.setState({ languages: temp });
      word = "active";
    }

    if (temp.length < 1) {
      axios
        .get("api/books/browserbooks")
        .then((res) => this.setState({ books: res.data }))
        .catch((err) => console.log(err));
      return 0;
    }
    axios
      .get("api/books/getbylanguage", {
        params: { languages: temp },
        paramsSerializer: (params) => {
          return qs.stringify(params);
        },
      })
      .then((res) => this.setState({ books: res.data }));
    return word;
  };

  findForTranslating = () => {
    this.setState({ translate: !this.state.translate });
    if (!this.state.translate) {
      axios
        .get("/api/books/translatebooks")
        .then((res) => this.setState({ books: res.data }))
        .catch((err) => console.log(err));
    } else {
      axios
        .get("api/books/browserbooks")
        .then((res) => this.setState({ books: res.data }))
        .catch((err) => console.log(err));
    }
  };

  showNotification = (message, level) => {
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message: message,
      level: level,
      position: "tl",
    });
  };

  render() {
    let display =
      this.state.books.length !== 0 ? (
        this.state.books.map((book) => (
          <Book
            key={book._id}
            url={book.bookCover}
            book_url={book.bookURL}
            bookId={book._id}
            readonly={true}
            isLibrary={false}
            notify={this.showNotification}
          />
        ))
      ) : (
        <div>Nothing to show</div>
      );
    return (
      <div className="container Browser" style={{ marginTop: "7em" }}>
        <NotificationSystem ref={this.notificationSystem} />

        {/** Search form */}
        <div className="md-form mt-0">
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Search"
            aria-label="Search"
            onChange={this.onChange}
            onKeyPress={this.handlePress}
          />
        </div>
        <button
          className="btn mb-5 filter-btn"
          type="button"
          data-toggle="collapse"
          data-target="#filter"
        >
          <i className="fas fa-filter"></i>Filter
        </button>
        <div className="row collapse border" id="filter">
          <div className="form-check ml-5">
            <button
              className={cx("btn", "rounded-pill", {
                active: this.state.translate,
              })}
              onClick={this.findForTranslating}
            >
              For translating
            </button>
          </div>
          <div className="form-check ml-5">
            <button className="btn rounded-pill">New</button>
          </div>
          <div className="border mx-3 lang">
            <h3>Choose language</h3>
            <div>
              <button
                className={cx("btn", "rounded-pill", {
                  active: this.state.languages.indexOf("Kinyarwanda") > -1,
                })}
                onClick={this.setLanguage}
                value="Kinyarwanda"
              >
                Kinyarwanda
              </button>
            </div>
            <div>
              <button
                className={cx("btn", "rounded-pill", {
                  active: this.state.languages.indexOf("English") > -1,
                })}
                value="English"
                onClick={this.setLanguage}
              >
                English
              </button>
            </div>
            <div>
              <button
                className={cx("btn", "rounded-pill", {
                  active: this.state.languages.indexOf("French") > -1,
                })}
                onClick={this.setLanguage}
                value="French"
              >
                French
              </button>
            </div>
            <div>
              <button
                className={cx("btn", "rounded-pill", {
                  active: this.state.languages.indexOf("Spanish") > -1,
                })}
                onClick={this.setLanguage}
                value="Spanish"
              >
                Spanish
              </button>
            </div>
            <div>
              <button
                className={cx("btn", "rounded-pill", {
                  active: this.state.languages.indexOf("Swahili") > -1,
                })}
                onClick={this.setLanguage}
                value="Swahili"
              >
                Swahili
              </button>
            </div>
          </div>
          <div className="genre">
            choose genre
            <span> (Coming)</span>
          </div>
        </div>
        <div className="row">{display}</div>
      </div>
    );
  }
}

export default Browser;

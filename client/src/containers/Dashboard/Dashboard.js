import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import { connect } from "react-redux";
import NotificationSystem from "react-notification-system";

import "./Dashboard.css";
import { get_books, removeBook } from "../../store/actions/booksAction";

class Dashboard extends Component {
  state = {
    books: [],
    errors: null,
    tempData: {},
  };

  notificationSystem = React.createRef();

  componentDidMount() {
    // axios
    //   .get("api/books/tempget")
    //   .then((res) => this.setState({ books: res.data }))
    //   .catch((err) => this.setState({ errors: err }));

    this.props.getbooks();
    // console.log(this.props.books);
  }

  async contentDisplay(bookId, obj) {
    // const prom = axios
    //   .get(`api/books/bookcontent/${bookId}`)
    //   .then((res) => res.data);
    // await prom;
    const prom = axios.get(`api/books/bookcontent/${bookId}`).then((res) => {
      obj.books = _.cloneDeep(res.data);
    });
    await prom;
    return 0;
    // console.log(data);
    // let display = <div>{data.book.bookName}</div>;
    // return data;
  }

  showNotification = (message, level) => {
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message: message,
      level: level,
      position: "br",
    });
  };

  helperFunction = (data) => {
    // console.log(data);
    // let display = <div>{data.book.bookName}</div>;
    // this.setState({ tempData: data });
    // return display;
    // const result = await this.contentDisplay(bookId);
    // return result;
    console.log(data);
    return <div>ooooo</div>;
  };

  deleteBook = (bookId) => {
    axios
      .post(`api/books/deletebook/${bookId}`)
      .then((res) => console.log("Book deleted"));
  };

  deleteChapter = (chapterId) => {
    axios
      .post(`api/books/deletechapter/${chapterId}`)
      .then((res) => {
        console.log("Temp reload");
        this.showNotification("Chapter removed!", "warning");
      })
      .catch((err) => console.log(err));
  };

  publishChapter = (chapterId) => {
    axios
      .post(`api/books/publishchapter/${chapterId}`)
      .then((res) => {
        console.log("Reload to see changes(xorry)");
        this.showNotification("Chapter published!", "success");
      })
      .catch((err) => console.log(err));
  };

  publishBook = (bookId) => {
    axios
      .post(`api/books/publishbook/${bookId}`)
      .then((res) => {
        console.log("Temporarly reload needed");
        this.showNotification("Book published!", "success");
      })
      .catch((err) => console.log(err));
  };

  render() {
    // let display = this.state.books.map(book => (
    // <div>{this.contentDisplay(_.pick(book, ["_id", "title"]))}</div>
    // ))
    // this.state.books.map((book) => {
    //   let temp = null;
    //   // temp = this.contentDisplay(book._id);
    //   // this.contentDisplay(book._id);
    //   // console.log(temp);
    //   // console.log(this.state.tempData);

    //   return (async () => {
    //     let temp1 = await this.helperFunction(book._id);
    //     console.log(temp1.data);
    //   })();
    // });
    // let display = this.state.books.map((book) => {
    //   let temp = {
    //     books: {},
    //     name: "temporarly",
    //   };
    //   this.contentDisplay(book._id, temp);
    //   // this.helperFunction(temp);
    //   console.log(temp);
    //   return this.helperFunction(temp);
    // });

    let display = this.props.books
      ? this.props.books.map((book) => (
          <div key={book.bookId}>
            <button
              className="btn col-8 col-md-12"
              type="button"
              data-toggle="collapse"
              data-target={`#book${book.bookId}`}
              aria-expanded="false"
              aria-controls="chapters"
            >
              <span className="name">{book.bookName}</span>
              <span
                className="delete-button"
                onClick={() => this.deleteBook(book.bookId)}
              >
                <i className="float-right mr-2 far fa-trash-alt"></i>
              </span>
              {!book.published ? (
                <span
                  className="publish-button"
                  onClick={() => this.publishBook(book.bookId)}
                  title="Publish Book"
                >
                  <i className="float-right mr-5 fas fa-upload"></i>
                </span>
              ) : null}
            </button>
            <div id={`book${book.bookId}`}>
              {book.chapters.map((chapter) => (
                <div key={chapter._id} className="mb-2 chap">
                  <span className="name">{chapter.name}</span>
                  <span
                    className="delete-button"
                    onClick={() => this.deleteChapter(chapter._id)}
                  >
                    <i className="float-right mr-2 far fa-trash-alt"></i>
                  </span>
                  {!chapter.published ? (
                    <span
                      className="publish-button"
                      onClick={() => this.publishChapter(chapter._id)}
                      title="Publish chapter"
                    >
                      <i className="float-right mr-5 fas fa-upload"></i>
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))
      : null;
    return (
      <div className="container Dashboard">
        <NotificationSystem ref={this.notificationSystem} />
        <h2>These are your stories for easy modification</h2>
        <div className="books border">{display}</div>
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
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

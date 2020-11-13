import React, { Component } from "react";
import axios from "axios";

import "./ContentBar.css";

class ContentBar extends Component {
  state = {
    tableOfContent: null,
  };

  // tempGetContent = () => {
  //   // console.log(this.props.location.state.data.book.bookId);
  //   axios
  //     .get(
  //       `api/books/bookcontent/${this.props.location.state.data.book.bookId}`
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // }

  componentDidMount() {
    // axios.get(`api/books/bookcontent/${this.props.bookId}`).then((res) => {
    //   this.setState({ tableOfContent: res.data });
    // });
  }
  render() {
    let content = this.props.contentTable ? (
      this.props.contentTable.chapters.map((chap) => (
        <li key={chap.chapterId}>
          <span
            href={`#drop${chap.chapterId}`}
            data-toggle="collapse"
            aria-expanded="false"
            className="dropdown-toggle"
          >
            {chap.name}
          </span>
          <ul className="collapse list-unstyled" id={`drop${chap.chapterId}`}>
            {chap.pages ? (
              chap.pages.map((page) => (
                <li
                  key={page.num}
                  className=""
                  onClick={() => this.props.click(page._id)}
                >
                  <span>{page.num}</span>
                </li>
              ))
            ) : (
              <li>No pages</li>
            )}
          </ul>
        </li>
      ))
    ) : (
      <div>No content</div>
    );
    return (
      <div className="container bg-primary">
        <ul>{content}</ul>
      </div>
    );
  }
}

export default ContentBar;

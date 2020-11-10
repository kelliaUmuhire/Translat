import React, { Component } from "react";

import "./ContentBar.css";

class ContentBar extends Component {
  render() {
    let content = this.props.data ? (
      this.props.data.chapters.map((chap) => (
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
                <li key={page.num} className="">
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
      <div className="container">
        <ul>{content}</ul>
      </div>
    );
  }
}

export default ContentBar;

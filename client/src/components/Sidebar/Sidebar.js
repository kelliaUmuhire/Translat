import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { EditorState, ContentState } from "draft-js";

import "./Sidebar.css";
import { addChapter, createPage } from "../../store/actions/booksAction";
import SimpleForm from "../UI/SimpleForm";

class Sidebar extends Component {
  state = {
    chapName: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  newChapter = () => {
    const newChap = {
      name: this.state.chapName,
      bookId: this.props.data.book.bookId,
    };

    this.props.addChapter(newChap);
  };

  newPage = (chapterId) => {
    const pageContent = EditorState.createWithContent(
      ContentState.createFromText("Add your")
    );
    const newPage = {
      content: {
        text: "Add your content",
      },
      chapterId: chapterId,
    };

    this.props.addPage(newPage);
  };

  deletePage = (pageId) => {
    axios
      .post(`api/books/deletepage/${pageId}`)
      .then((res) => {
        console.log("Page deleted");
      })
      .catch((err) => console.log(err));
  };
  render() {
    // const style = { this.state.show };
    let chapterContent = null;
    if (this.props.data.chapters) {
      chapterContent = this.props.data.chapters.map((chap) => (
        <li key={chap.chapterId}>
          <a
            href={`#drop${chap.chapterId}`}
            data-toggle="collapse"
            aria-expanded="false"
            className="dropdown-toggle"
          >
            {chap.name}
          </a>
          <ul className="collapse list-unstyled" id={`drop${chap.chapterId}`}>
            {chap.pages ? (
              chap.pages.map((page) => (
                <li
                  key={page.num}
                  className={this.props.pageId === page._id ? "active" : ""}
                >
                  <span
                    onClick={() => this.props.setPage(page._id, page.content)}
                  >
                    {page.num}
                  </span>
                  <span onClick={() => this.deletePage(page._id)}>
                    <i className="far fa-trash-alt"></i>
                  </span>
                </li>
              ))
            ) : (
              <li>No pages</li>
            )}
            <span
              className="pl-4"
              title="New page"
              onClick={() => this.newPage(chap.chapterId)}
            >
              <i className="fas fa-plus"></i>
            </span>
          </ul>
        </li>
      ));
    } else {
      chapterContent = <div>No chapters</div>;
    }

    return (
      <div className="wrapper rounded-left">
        <nav id="sidebar" className={this.props.show ? "active" : ""}>
          <div className="sidebar-header bg-dark">
            <h3>{this.props.data.book.name}</h3>
            <span onClick={this.props.hide}>
              <i class="fas fa-arrow-left"></i>
            </span>
          </div>

          <ul className="list-unstyled components">
            <button
              data-toggle="collapse"
              data-target="#chapInput"
              title="new chapter"
              className="newChap"
            >
              <i
                className="fas fa-plus"
                style={{ background: "transparent" }}
              ></i>
            </button>
            <SimpleForm
              onChange={this.onChange}
              onClick={this.newChapter}
              title="Add chapter"
              id="chapInput"
            />
            {chapterContent}
          </ul>
        </nav>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addChapter: (chapter) => dispatch(addChapter(chapter)),
  addPage: (page) => dispatch(createPage(page)),
});

export default connect(null, mapDispatchToProps)(Sidebar);

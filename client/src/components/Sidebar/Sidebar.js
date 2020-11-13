import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { EditorState, ContentState } from "draft-js";

import "./Sidebar.css";
import { addChapter, createPage } from "../../store/actions/booksAction";
import SimpleForm from "../UI/SimpleForm";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapName: "",
      edit: false,
      chapHolder: "",
    };

    this.saveChanges = this.saveChanges.bind(this);
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e);
  };

  // newChapter = () => {
  //   const newChap = {
  //     name: this.state.chapName,
  //     bookId: this.props.data.book.bookId,
  //   };

  //   this.props.addChap(newChap);
  //   // window.location.reload(false);
  // };

  // newPage = (chapterId) => {
  //   const pageContent = EditorState.createWithContent(
  //     ContentState.createFromText("Add your")
  //   );
  //   const newPage = {
  //     content: {
  //       text: "Add your content",
  //     },
  //     chapterId: chapterId,
  //   };

  //   this.props.addPage(newPage);
  // };

  // deletePage = (pageId) => {
  //   axios
  //     .post(`api/books/deletepage/${pageId}`)
  //     .then((res) => {
  //       console.log("Page deleted");
  //     })
  //     .catch((err) => console.log(err));
  // };
  listenForDoubleClick = (e) => {
    console.log("Double clicked");
    this.setState({ edit: !this.state.edit });
  };

  onBlur = (chapterId) => {
    this.setState({ edit: false });
    // console.log(chapterId);
    let temp = {
      name: this.state.chapHolder,
      bookId: this.props.contentTable.book.bookId,
    };
    if (this.state.chapHolder !== "") {
      axios
        .post(`api/books/updatechapter/${chapterId}`, temp)
        .then((res) => console.log("ChapterName changed!"))
        .catch((err) => console.log(err));
    } else {
      console.log("Empty!!!!");
    }
  };

  saveChanges = (e) => {
    this.setState({ chapHolder: e.target.innerText });
  };
  render() {
    // const style = { this.state.show };
    let chapterContent = null;
    let title = null;
    if (this.props.contentTable) {
      console.log("Content there!");
      if (this.props.contentTable.chapters) {
        chapterContent = this.props.contentTable.chapters.map((chap) => (
          <li key={chap.chapterId}>
            <a
              href={`#drop${chap.chapterId}`}
              data-toggle="collapse"
              aria-expanded="false"
              className=""
              name="chapHolder"
              value=""
              onDoubleClick={this.listenForDoubleClick}
              contentEditable={this.state.edit}
              onBlur={() => this.onBlur(chap.chapterId)}
              onInput={this.saveChanges}
              suppressContentEditableWarning={true}
            >
              {chap.name}
              <span
                className="ml-5"
                onClick={() => this.props.deletechap(chap.chapterId)}
              >
                <i className="far fa-trash-alt"></i>
              </span>
            </a>
            <ul className="collapse list-unstyled" id={`drop${chap.chapterId}`}>
              {chap.pages ? (
                chap.pages.map((page) => (
                  <li
                    key={page.num}
                    className={this.props.pageId === page._id ? "active" : ""}
                  >
                    <span onClick={() => this.props.setPage(page._id)}>
                      {page.num}
                    </span>
                    <span onClick={() => this.props.deletepage(page._id)}>
                      <i className="ml-3 far fa-trash-alt"></i>
                    </span>
                  </li>
                ))
              ) : (
                <li>No pages</li>
              )}
              <span
                className="pl-4"
                title="New page"
                onClick={() => this.props.newpage(chap.chapterId)}
              >
                <i className="fas fa-plus"></i>
              </span>
            </ul>
          </li>
        ));
        title = this.props.contentTable.book.bookName;
      } else {
        chapterContent = <div>No chapters</div>;
      }
    } else {
      chapterContent = <div>Hold on </div>;
    }

    return (
      <div className="wrapper rounded-left bg-light align-start">
        <nav id="sidebar" className={this.props.show ? "active" : ""}>
          <div className="sidebar-header">
            <h4>{title}</h4>
            {/* <span onClick={this.props.hide}>
              <i class="fas fa-arrow-left"></i>
            </span> */}
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
              chap={this.state.chapName}
              click={() => this.props.newchapter(this.state.chapName)}
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
  addChap: (chapter) => dispatch(addChapter(chapter)),
  addPage: (page) => dispatch(createPage(page)),
});

export default connect(null, mapDispatchToProps)(Sidebar);

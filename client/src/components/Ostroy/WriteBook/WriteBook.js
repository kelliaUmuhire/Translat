import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import Axios from "axios";
import debounce from "lodash/debounce";
import { stateToHTML } from "draft-js-export-html";
import _, { reduce } from "lodash";

import "./WriteBook.css";
import Sidebar from "../../Sidebar/Sidebar";
import checkUndefined from "../../../utils/checkUndefined";

class WriteBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      content: {},
      tableOfContent: null,
      show: false,
      pageId: checkUndefined(this.props.book.chapters[0].pages[0])
        ? this.props.book.chapters[0].pages[0]
        : null,
    };
    this.onChange = this.onChange.bind(this);
    this.setPage = this.setPage.bind(this);
  }

  componentDidMount() {
    axios
      .get(`api/books/bookcontent/${this.props.book.book.bookId}`)
      .then((res) => {
        this.setState({ tableOfContent: res.data });
      })
      .catch((err) => console.log(err));
  }

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    // this.saveContent(contentState);
    this.setState({
      content: contentState,
      editorContentHtml: stateToHTML(editorState.getCurrentContent()),
    });
    this.setState({ editorState });
  };

  saveContent = () => {
    let pageId = this.state.pageId;
    let content = this.state.editorState.getCurrentContent();
    Axios.post(
      `api/books/updatepage/${pageId}`,
      { content: convertToRaw(content) },
      { headers: { "Content-Type": "application/json" } }
    )
      .then((res) => console.log("saved"))
      .catch((err) => console.log(err));
  };

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  goToRead = () => {
    const { editorState } = this.state;
    this.props.history.push({
      pathname: "/readcontent",
      state: { content: stateToHTML(editorState.getCurrentContent()) },
    });
    console.log("there");
    //console.log(stateToHTML(editorState.getCurrentContent()));
  };
  showOrHide = () => {
    this.setState({ show: !this.state.show });
  };

  setPage = (pageId) => {
    console.log("Clicked!!!");
    axios
      .get(`api/books/getpage/${pageId}`)
      .then((res) => {
        let temp = JSON.parse(res.data.content);
        let editorState = null;

        if (temp.text === undefined) {
          editorState = EditorState.createWithContent(convertFromRaw(temp));
        } else {
          editorState = EditorState.createWithContent(
            ContentState.createFromText("Add your content")
          );
        }

        this.setState({
          pageId: pageId,
          editorState: editorState,
        });
      })
      .catch((err) => console.log(err));
  };

  newPage = (chapterId) => {
    const newPage = {
      content: {
        text: "Add your content",
      },
      chapterId: chapterId,
    };

    axios
      .post("api/books/addpage", newPage)
      .then((res) => {
        let temp = _.cloneDeep(this.state.tableOfContent);
        let tempIndex = temp.chapters.findIndex(
          (x) => x.chapterId === chapterId
        );
        console.log(tempIndex);
        // console.log(temp.chapters[tempIndex].pages);
        temp.chapters[tempIndex].pages.push(res.data);
        // console.log(temp);
        this.setState({ tableOfContent: temp });
      })
      .catch((err) => console.log(err));
  };

  deletePage = (pageId) => {
    axios
      .post(`api/books/deletepage/${pageId}`)
      .then((res) => {
        let temp = _.cloneDeep(this.state.tableOfContent);
        let tempIndex = temp.chapters.findIndex(
          (x) => x.chapterId === res.data.chapter_id
        );
        let tempIndexPage = temp.chapters[tempIndex].pages.findIndex(
          (x) => x.chapter_id === res.data.chapter_id
        );
        temp.chapters[tempIndex].pages.splice(tempIndexPage, 1);
        this.setState({ tableOfContent: temp });
        console.log("Page deleted");
      })
      .catch((err) => console.log(err));
  };

  newChapter = (chapName) => {
    const newChap = {
      name: chapName,
      bookId: this.state.tableOfContent.book.bookId,
    };

    axios
      .post("api/books/addchapter", newChap)
      .then((res) => {
        let temp = _.cloneDeep(this.state.tableOfContent);
        temp.chapters.push(res.data);
        console.log(temp);
        this.setState({ tableOfContent: temp });
      })
      .catch((err) => console.log(err));
    // window.location.reload(false);
  };

  deleteChapter = (chapterId) => {
    axios.post(`api/books/deletechapter/${chapterId}`).then((res) => {
      let temp = _.cloneDeep(this.state.tableOfContent);
      let tempIndex = temp.chapters.findIndex(
        (x) => x.chapterId === res.data._id
      );
      temp.chapters.splice(tempIndex, 1);
      this.setState({ tableOfContent: temp });
      console.log("Chapter deleted!");
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          {/* <div className="sidebar bg-dark mt-5 rounded-left col-2 mr-0 collapse sidebar-collapse" id="sidebarResponsive">This is the sidebar</div> */}
          <div className="sidebar col-2">
            <Sidebar
              show={this.state.show}
              data={this.props.book}
              contentTable={this.state.tableOfContent}
              setPage={this.setPage}
              pageId={this.state.pageId}
              hide={this.showOrHide}
              newpage={this.newPage}
              newchapter={this.newChapter}
              deletepage={this.deletePage}
              deletechap={this.deleteChapter}
            />
          </div>
          <div className="content shadow col-10 col-sm-10">
            {/* <button
              type="button"
              id="sidebarCollapse"
              className="btn btn-info"
              onClick={this.showOrHide}
            >
              <i className="fas fa-align-left"></i>
            </button> */}
            <button onClick={this.saveContent} className="bg-light btn ml-5">
              <i className="fas fa-save"></i> Save
            </button>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              handleKeyCommand={this.handleKeyCommand}
            />
          </div>
        </div>

        {/* <div
          className={`overlay ${this.state.show ? "" : "over"} `}
          style={{ marginTop: "-8rem" }}
        ></div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  book: state.books.editBook,
});
export default connect(mapStateToProps)(WriteBook);

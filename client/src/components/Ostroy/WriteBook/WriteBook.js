import React, { Component } from "react";
import { connect } from "react-redux";
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

import "./WriteBook.css";
import Sidebar from "../../Sidebar/Sidebar";
import checkUndefined from "../../../utils/checkUndefined";

class WriteBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      content: {},
      editorContentHtml: null,
      show: false,
      pageId: checkUndefined(this.props.book.chapters[0].pages[0])
        ? this.props.book.chapters[0].pages[0]
        : null,
    };
    this.onChange = this.onChange.bind(this);
    this._onBoldClick = this._onBoldClick.bind(this);
    this.setPage = this.setPage.bind(this);
    // this.saveContent = this.saveContent.bind(this);
  }

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    this.saveContent(contentState);
    // console.log('content state', convertToRaw(contentState));
    this.setState({
      content: contentState,
      editorContentHtml: stateToHTML(editorState.getCurrentContent()),
    });
    this.setState({ editorState });
    console.log(editorState);
  };

  saveContent = debounce((content) => {
    let pageId = this.state.pageId;
    // let temp = this.props.location.state.data.chapters[0].pages[0].content;
    // console.log(
    //   EditorState.createWithContent(
    //     ContentState.createFromText(
    //       this.props.location.state.data.chapters[0].pages[0].content
    //     )
    //   )
    // );
    // EditorState.createWithContent(
    //   convertFromRaw(JSON.parse(this.props.book.chapters[0].pages[0].content))
    // )

    // const blocks = convertFromRaw(
    //   JSON.parse(this.props.location.state.data.chapters[0].pages[0].content)
    // );

    // console.log(blocks);

    // const temp2 = ContentState.createFromBlockArray(
    //   convertFromRaw(
    //     this.props.location.state.data.chapters[0].pages[0].content
    //   )
    // );
    // console.log(`temp1${temp}`);
    // console.log(
    //   EditorState.createWithContent(
    //     ContentState.createFromBlockArray(convertFromRaw(temp))
    //   )
    // );
    Axios.post(
      `api/books/updatepage/${pageId}`,
      { content: convertToRaw(content) },
      { headers: { "Content-Type": "application/json" } }
    )
      .then((res) => console.log("saved"))
      .catch((err) => console.log(err));
  }, 1000);

  // saveAll = () => {

  // }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  }

  _onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  };

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

  setPage = (pageId, content) => {
    console.log("Clicked!!!");
    let temp = JSON.parse(content);
    let editorState = null;
    console.log(temp.text);
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
  };

  render() {
    return (
      <div>
        <div className="container full">
          {/* <div className="sidebar bg-dark mt-5 rounded-left col-2 mr-0 collapse sidebar-collapse" id="sidebarResponsive">This is the sidebar</div> */}
          <div className="sidebar ">
            <Sidebar
              show={this.state.show}
              data={this.props.book}
              setPage={this.setPage}
              pageId={this.state.pageId}
              hide={this.showOrHide}
            />
          </div>
          <div className="full">
            <button
              type="button"
              id="sidebarCollapse"
              className="btn btn-info"
              onClick={this.showOrHide}
            >
              <i className="fas fa-align-left"></i>
            </button>
            <button onClick={this.saveAll} className="bg-light btn ml-5">
              Save
            </button>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              handleKeyCommand={this.handleKeyCommand}
            />
          </div>
        </div>

        <div
          className={`overlay ${this.state.show ? "" : "over"} `}
          style={{ marginTop: "-8rem" }}
        ></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  book: state.books.editBook,
});
export default connect(mapStateToProps)(WriteBook);

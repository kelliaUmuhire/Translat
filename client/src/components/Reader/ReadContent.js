import React, { Component } from "react";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw, ContentState } from "draft-js";
import ReactHtmlParser from "react-html-parser";
import { connect } from "react-redux";
import axios from "axios";

import ContentBar from "../Sidebar/ContentBar";
import checkUndefined from "../../utils/checkUndefined";
import "./css/ReadContent.css";

class ReadContent extends Component {
  state = {
    rawContent: this.props.location.state.data.chapters[0].pages[0].content,
    pageNum: this.props.location.state.data.chapters[0].pages[0].num,
    chapName: this.props.location.state.data.chapters[0].name,
    chapIndex: 0,
    pageIndex: 0,
    resPages: null,
  };

  prevPage = () => {
    const data = { ...this.props.location.state.data };
    const chapLength = data.chapters.length;
    const pagesNum = data.chapters[0].pages.length;
    if (this.state.chapIndex === chapLength) {
      console.log("No more chapters");
      return 0;
    }
    if (this.state.pageIndex - 1 < pagesNum && this.state.pageIndex - 1 > -1) {
      this.setState({
        pageIndex: this.state.pageIndex - 1,
        rawContent:
          data.chapters[this.state.chapIndex].pages[this.state.pageIndex - 1]
            .content,
        pageNum:
          data.chapters[this.state.chapIndex].pages[this.state.pageIndex - 1]
            .num,
      });
    } else {
      console.log("No more pages");
      return 0;
    }
  };

  nextPage = () => {
    const data = { ...this.props.location.state.data };
    const chapLength = data.chapters.length;
    const pagesNum = data.chapters[0].pages.length;
    let resPages;

    //Check for no more chapters
    if (this.state.chapIndex === chapLength) {
      console.log("No more chapters");
      return 0;
    }

    //move to next page
    if (this.state.pageIndex + 1 < pagesNum) {
      //check if we got resPages
      console.log(this.state.pageIndex);
      this.setState({
        pageIndex: this.state.pageIndex + 1,
        pageNum:
          data.chapters[this.state.chapIndex].pages[this.state.pageIndex + 1]
            .num,
      });
      console.log(this.state.pageIndex);

      if (this.state.resPages !== null) {
        this.setState({ rawContent: resPages[this.state.pageIndex + 1] });
      } else {
        this.setState({
          rawContent:
            data.chapters[this.state.chapIndex].pages[this.state.pageIndex + 1]
              .content,
        });
      }
    } else {
      //move to the next chapter pages if any
      if (data.chapters[this.state.chapIndex + 1]) {
        axios
          .get(
            `api/books/getpagesinchap/${
              data.chapters[this.state.chapIndex + 1].chapterId
            }`
          )
          .then((res) => {
            console.log(res.data);
            resPages = res.data;
          })
          .catch((err) => console.log(err));
        this.setState({
          pageIndex: 0,
          chapIndex: this.state.chapIndex + 1,
          rawContent: resPages[0].content,
          pageNum: resPages[0].num,
          resPages: resPages,
        });
      } else {
        console.log("No more pages");
        return 0;
      }
    }
  };

  render() {
    let showContent;
    let temp = JSON.parse(this.state.rawContent);
    console.log(temp);
    if (temp.text === undefined) {
      showContent = stateToHTML(
        convertFromRaw(JSON.parse(this.state.rawContent))
      );
    } else {
      showContent = stateToHTML(
        ContentState.createFromText("Add your content")
      );
    }

    return (
      <div className="read">
        <div className="fash-bottom sticky-top" id="fash-bottom">
          <div
            className="coll float-left"
            data-toggle="collapse"
            data-target="#bar"
          >
            <i className="fas fa-bars"></i>
          </div>
          <div className="bname">
            {this.props.location.state.data.book.name}
          </div>

          <div id="bar" className="border shadow" style={{ width: "40%" }}>
            <ContentBar data={this.props.book} />
          </div>
        </div>
        <div
          className="container"
          style={{
            marginTop: "0.5rem",
            border: "1px black",
            padding: "10px",
            width: "100%",
            textAlign: "left",
          }}
        >
          <div
            className="chapName"
            style={{ textAlign: "center", paddingBottom: "1rem" }}
          >
            {this.state.chapName}
          </div>
          <div className="">{ReactHtmlParser(showContent)}</div>
          <div className="pageNum align-center" style={{ textAlign: "center" }}>
            {this.state.pageNum}
          </div>
          <div className="d-flex flex-row">
            <div>
              <button
                type="button"
                className="btn bg-light p-3"
                onClick={this.prevPage}
              >
                <i class="fas fa-arrow-alt-circle-left"></i>
              </button>
            </div>
            <div>
              <button
                type="button"
                className="btn bg-light"
                onClick={this.nextPage}
              >
                <i className="fas fa-arrow-alt-circle-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  book: state.books.editBook,
});

export default connect(mapStateToProps)(ReadContent);

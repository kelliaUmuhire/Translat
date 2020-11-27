import React, { Component } from "react";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw, ContentState } from "draft-js";
import ReactHtmlParser from "react-html-parser";
import { connect } from "react-redux";
import _ from "lodash";
import axios from "axios";

import ContentBar from "../Sidebar/ContentBar";
import "./css/ReadContent.css";

class ReadContent extends Component {
  state = {
    tableOfContent: null,
    rawContent: JSON.stringify({ text: "this is the placeholder" }),
    pageNum: 0,
    chapName: "",
    pageId: null,
    chapIndex: 0,
    pageIndex: 0,
    resPages: null,
    chapterName: "",
  };

  componentDidMount() {
    console.log(this.props.location.state.data.chapters.length);
    setInterval(() => {
      if (this.props.location.state.data.chapters[0].pages[0] !== undefined) {
        axios
          .get(
            `api/books/getpage/${this.props.location.state.data.chapters[0].pages[0]._id}`
          )
          .then((res) => {
            this.setState({
              rawContent: res.data.content,
              pageNum: res.data.num,
              chapterName: this.props.location.state.data.chapters[0].name,
            });
          });
      }
    }, 1000);
    if (this.props.location.state.data.chapters[0].pages[0] !== undefined) {
      axios
        .get(
          `api/books/getpage/${this.props.location.state.data.chapters[0].pages[0]._id}`
        )
        .then((res) => {
          this.setState({
            rawContent: res.data.content,
            pageNum: res.data.num,
            chapterName: this.props.location.state.data.chapters[0].name,
          });
        });
    }
  }

  tempGet = () => {
    axios
      .get(
        `api/books/bookcontent/${this.this.props.location.state.data.book.bookId}`
      )
      .then((res) => res.data);
  };

  setPage = (pageId) => {
    if (pageId) {
      axios
        .get(`api/books/getpage/${pageId}`)
        .then((res) => {
          this.setState({
            rawContent: res.data.content,
            pageNum: res.data.num,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  prevPage = () => {
    const data = { ...this.props.location.state.data };
    // const chapLength = data.chapters.length;
    const pagesNum = data.chapters[0].pages.length;
    if (this.state.chapIndex < 0) {
      console.log("No more chapters");
      return 0;
    }
    if (this.state.pageIndex - 1 < pagesNum && this.state.pageIndex - 1 > -1) {
      this.setState({
        pageIndex: this.state.pageIndex - 1,
        pageNum:
          data.chapters[this.state.chapIndex].pages[this.state.pageIndex - 1]
            .num,
      });

      this.setPage(
        this.props.location.state.data.chapters[this.state.chapIndex].pages[
          this.state.pageIndex - 1
        ]._id
      );
    } else {
      //move to previous chapter if any
      if (this.props.location.state.data.chapters[this.state.chapIndex - 1]) {
        if (
          !_.isEmpty(
            this.props.location.state.data.chapters[this.state.chapIndex - 1]
              .pages
          )
        ) {
          let holder =
            this.props.location.state.data.chapters[this.state.chapIndex - 1]
              .pages.length - 1;
          this.setState({
            pageIndex: holder,
            chapIndex: this.state.chapIndex - 1,
            pageNum: this.props.location.state.data.chapters[
              this.state.chapIndex - 1
            ].pages[holder].num,
          });

          this.setPage(
            this.props.location.state.data.chapters[this.state.chapIndex - 1]
              .pages[holder]._id
          );
        } else {
          console.log("No more pages");
          return 0;
        }
      }
    }
  };

  nextPage = () => {
    const chapLength = this.props.location.state.data.chapters.length;
    const pagesNum = this.props.location.state.data.chapters[
      this.state.chapIndex
    ].pages.length;

    //Check for no more chapters
    if (this.state.chapIndex === chapLength) {
      console.log("No more chapters");
      return 0;
    }
    console.log(this.state.pageIndex, chapLength);

    // //move to next page
    if (this.state.pageIndex + 1 < pagesNum) {
      console.log(`${this.state.pageIndex + 1} < ${pagesNum}`);
      //   //check if we got resPages
      //   console.log(this.state.pageIndex);
      this.setState({
        pageIndex: this.state.pageIndex + 1,
        pageNum: this.props.location.state.data.chapters[this.state.chapIndex]
          .pages[this.state.pageIndex + 1].num,
      });
      // console.log(this.state.pageIndex);

      this.setPage(
        this.props.location.state.data.chapters[this.state.chapIndex].pages[
          this.state.pageIndex + 1
        ]._id
      );
    } else {
      //move to the next chapter pages if any
      if (this.props.location.state.data.chapters[this.state.chapIndex + 1]) {
        if (
          !_.isEmpty(
            this.props.location.state.data.chapters[this.state.chapIndex + 1]
              .pages
          )
        ) {
          this.setState({
            pageIndex: 0,
            chapIndex: this.state.chapIndex + 1,
            chapterName: this.props.location.state.data.chapters[
              this.state.chapIndex + 1
            ].name,
            pageNum: this.props.location.state.data.chapters[
              this.state.chapIndex + 1
            ].pages[0].num,
          });

          this.setPage(
            this.props.location.state.data.chapters[this.state.chapIndex + 1]
              .pages[0]._id
          );
        } else {
          console.log("No more pages");
          return 0;
        }
      }
    }
  };

  render() {
    let showContent;
    let temp = JSON.parse(this.state.rawContent);
    if (temp.text === undefined) {
      showContent = stateToHTML(
        convertFromRaw(JSON.parse(this.state.rawContent))
      );
    } else {
      showContent = stateToHTML(ContentState.createFromText("Hold on"));
    }

    return (
      <div className="read">
        <div
          className="fash-bottom"
          id="fash-bottom"
          style={{ fontSize: "inherit" }}
        >
          <div className="coll" data-toggle="collapse" data-target="#bar">
            <i className="fas fa-bars"></i>
          </div>
          <div className="bname">
            {this.props.location.state.data.book.bookName}
          </div>

          <div id="bar" className="bar" style={{ width: "40%" }}>
            <ContentBar
              data={this.props.book}
              bookId={this.props.location.state.data.book.bookId}
              click={this.setPage}
              contentTable={this.props.location.state.data}
            />
          </div>
        </div>
        <div
          className="container bookPages"
          style={{
            // marginTop: "5rem",
            border: "1px black",
            padding: "10px",
            width: "100%",
            textAlign: "left",
          }}
        >
          <div
            className="chapName"
            style={{
              textAlign: "center",
              paddingBottom: "1rem",
              marginTop: "15rem",
            }}
          >
            {/* {this.props.location.state.data.chapters
              ? this.props.location.state.data.chapters[this.state.chapIndex]
                  .name
              : null} */}
            {this.state.chapterName}
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
                <i className="fas fa-arrow-alt-circle-left"></i>
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

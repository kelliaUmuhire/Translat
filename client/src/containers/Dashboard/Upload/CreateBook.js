import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { EditorState, ContentState, convertToRaw } from "draft-js";

import { createBook } from "../../../store/actions/booksAction";

class CreateBook extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      bookCover: "",
      title: "",
      author: "",
    };
  }

  onFileChange(e) {
    this.setState({ [e.target.name]: e.target.files[0] });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const coverData = new FormData();
    coverData.append("bookCover", this.state.bookCover);

    const details = {
      title: this.state.title,
      author: this.state.author,
    };

    const newChap = {
      name: "Untitled 1",
      bookId: "",
    };

    const pageContent = EditorState.createWithContent(
      ContentState.createFromText("Add your content")
    );
    const newPage = {
      content: convertToRaw(pageContent.getCurrentContent()),
      chapterId: "",
    };

    this.props.sendBook(coverData, details, newChap, newPage);
    // axios.post("api/books/sendcover", coverData, {
    // }).then(res => {
    //     console.log(res)
    //     axios.post("api/books/createbook", details, {
    //     }).then(res => {
    //         console.log(res)
    //         newChap.bookId = res.data._id;
    //         axios.post('api/books/addchapter', newChap)
    //             .then(res => {
    //                 newPage.chapterId = res.data._id
    //                 axios.post('api/books/addpage', newPage)
    //                     .then(res => {
    //                         console.log(res.data)
    //                         this.props.history.push({
    //                         pathname: '/writebook',
    //                         state: { data: res.data }
    //                         })}
    //                     )
    //                     .catch(err => console.log(err))
    //             })
    //             .catch(err => console.log(err))
    //     })
    // })
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <form onSubmit={this.onSubmit}>
            <div className="form-group" style={{ paddingTop: "1rem" }}>
              <div className="col-sm-12">
                <label>Book Cover</label>
                <input
                  type="file"
                  className="form-control"
                  placeholder="Upload Book Cover"
                  name="bookCover"
                  onChange={this.onFileChange}
                />
              </div>
            </div>
            <div className="form-group" style={{ paddingTop: "1rem" }}>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Title/Name of the book"
                  name="title"
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-group" style={{ paddingTop: "1rem" }}>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Author"
                  name="author"
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-6 mt-2">
                <input
                  type="submit"
                  value="Start writing"
                  className="form-control btn btn-warning pt-2 rounded"
                  style={{ marginLeft: "5rem" }}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  books: state.books.books,
});

const mapDispatchToProps = (dispatch) => ({
  sendBook: (coverData, details, newChap, newPage) =>
    dispatch(createBook(coverData, details, newChap, newPage)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreateBook));

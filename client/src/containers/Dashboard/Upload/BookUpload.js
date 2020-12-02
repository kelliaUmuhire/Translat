import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { uploadBook } from "../../../store/actions/booksAction";

class BookUpload extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      book: "",
      bookCover: "",
      title: "",
      author: "",
      owner: false,
      translate: false,
      bookLanguage: "",
      translateLang: "",
    };
  }

  onFileChange(e) {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.files[0] });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSelect = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("book", this.state.book);

    const coverData = new FormData();
    coverData.append("bookCover", this.state.bookCover);

    const details = {
      title: this.state.title,
      author: this.state.author,
      translate: this.state.translate,
      bookLanguage: this.state.bookLanguage,
      translateLang: this.state.translateLang,
    };

    this.props.sendBook(formData, coverData, details);
  };

  setAuthor = () => {
    if (!this.state.owner) {
      this.setState({
        author: this.props.user.firstName + " " + this.props.user.lastName,
      });
    }
    this.setState({ owner: !this.state.owner });
  };

  render() {
    return (
      <div className="container shadow-sm">
        {/* <div className="row"> */}
        {/* <div className="col-12"> */}
        <form onSubmit={this.onSubmit}>
          <div className="form-group" style={{ paddingTop: "1rem" }}>
            <div className="col-sm-12 col-6">
              <label>Book</label>
              <input
                type="file"
                className="form-control"
                name="book"
                onChange={this.onFileChange}
                required
              />
            </div>
          </div>
          <div className="form-group" style={{ paddingTop: "1rem" }}>
            <div className="col-sm-12">
              <label>Book Cover</label>
              <input
                type="file"
                className="form-control"
                placeholder="Upload Book Cover"
                name="bookCover"
                onChange={this.onFileChange}
                required
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
                required
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
                disabled={this.state.owner}
                required
              />
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="mine"
                onClick={this.setAuthor}
              />
              <label class="form-check-label" for="mine">
                The book is mine
              </label>
            </div>
          </div>
          {/* <div className="form-group" style={{ paddingTop: "1rem" }}>
              <div className="col-sm-12">
                <input
                  type="text"
                  className="form-control"
                  placeholder="The language of the book"
                  name="bookLanguage"
                  onChange={this.onChange}
                  required
                />
              </div>
            </div> */}
          <div className="col-auto my-1 mt-3">
            <label className="mr-sm-2" for="inlineFormCustomSelect">
              <strong>Select book language</strong>
            </label>
            <select
              className="custom-select mr-sm-2"
              id="inlineFormCustomSelect"
              onChange={this.onSelect}
              name="bookLanguage"
            >
              <option value="choose" selected>
                Choose...
              </option>
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Swahili">Swahili</option>
              <option value="Spanish">Spanish</option>
              <option value="Kinyarwanda">Kinyarwanda</option>
            </select>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="trans"
              onClick={() =>
                this.setState({ translate: !this.state.translate })
              }
            />
            <label className="form-check-label" for="trans">
              Searching for a translator?
            </label>
          </div>
          {this.state.translate ? (
            <div className="col-auto my-1">
              <label className="mr-sm-2" for="inlineFormCustomSelect">
                Choose language
              </label>
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={this.onSelect}
                name="translateLang"
              >
                <option value="choose" selected>
                  Choose...
                </option>
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Swahili">Swahili</option>
                <option value="Spanish">Spanish</option>
                <option value="Kinyarwanda">Kinyarwanda</option>
              </select>
            </div>
          ) : (
            "Okay!"
          )}
          <div className="form-group" style={{ paddingTop: "1rem" }}>
            <div className="">
              <input
                type="submit"
                value="Upload"
                className="form-control bg-warning shadow-sm"
              />
            </div>
          </div>
        </form>
        {/* </div> */}
      </div>
      // </div>
    );
  }
}

const mapStateToProps = (state) => ({
  books: state.books.books,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  sendBook: (formData, coverData, details) =>
    dispatch(uploadBook(formData, coverData, details)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BookUpload));

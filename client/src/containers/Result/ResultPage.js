import React, { Component } from "react";
import axios from "axios";
import Book from "../Book/Book";

import "./ResultPage.css";
import temp from "./tom.png";

class ResultPage extends Component {
  state = {
    books: [],
    profiles: [],
    name: "",
  };
  componentDidMount() {
    console.log(this.props.location.state.searchvalue);

    //get from books
    axios
      .get(`api/books/searchbook/${this.props.location.state.searchvalue}`)
      .then((res) => this.setState({ books: res.data }))
      .catch((err) => console.log(err));
    //get from profiles/users
    axios
      .get(`api/profile/searchprofile/${this.props.location.state.searchvalue}`)
      .then((res) => this.setState({ profiles: res.data }))
      .catch((err) => console.log(err));
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handlePress = (e) => {
    if (e.key === "Enter") {
      //search books
      axios
        .get(`api/books/searchbook/${this.state.name}`)
        .then((res) => this.setState({ books: res.data }))
        .catch((err) => console.log(err));
      //search profiles
      axios
        .get(`api/profile/searchprofile/${this.state.name}`)
        .then((res) => this.setState({ profiles: res.data }))
        .catch((err) => console.log(err));
    }
  };

  gotoProfile = (handle) => {
    this.props.history.push(`/profile/${handle}`);
    // console.log(handle);
  };

  render() {
    return (
      <div className="container Result">
        {/** Search form */}
        <div className="md-form mt-0">
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Search"
            aria-label="Search"
            onChange={this.onChange}
            onKeyPress={this.handlePress}
          />
        </div>
        <div className="row justify-content-between">
          <div className="float-left col-7">
            <div className="header">Books</div>
            <div className="row showBooks">
              {this.state.books.map((book) => (
                <Book
                  key={book._id}
                  url={book.bookCover}
                  book_url={book.bookURL}
                  bookId={book._id}
                  readonly={true}
                />
              ))}
            </div>
          </div>
          <div className="float-right col-4 container profiles">
            <div className="mb-4 mt-1 header">Profiles</div>
            {this.state.profiles.map((profile) => (
              <div key={profile._id} className="row profile">
                <div className="profile-img ml-5 my-3">
                  <img
                    src={profile.image !== "default" ? profile.image : temp}
                    alt="avatar"
                    className="rounded-circle img-thumbnail"
                  />
                </div>
                <div
                  className="info ml-2 text-center mt-4"
                  onClick={() => this.gotoProfile(profile.handle)}
                >
                  <span className="names">{profile.names}</span>
                  <div>@{profile.handle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ResultPage;

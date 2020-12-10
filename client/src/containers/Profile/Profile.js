import React, { Component } from "react";
import axios from "axios";
import ProfileHeader from "./Parts/ProfileHeader/ProfileHeader";
// import { connect } from "react-redux";

class Profile extends Component {
  state = {
    profile: {},
    library: {},
    tempBooks: [],
  };

  async componentDidMount() {
    let templib = [];
    let temp = [];
    //get library
    await axios
      .get(`/api/library/getbyname/${this.props.match.params.handle}`)
      .then((res) => {
        templib = res.data;
        this.setState({ library: res.data });
      })
      .catch((err) => console.log(err));

    //get books
    // templib.books.map((book) => {
    //   axios({
    //     method: "get",
    //     url: `/api/books/getone/${book}`,
    //   })
    //     .then((res) => {
    //       temp.push(res.data);
    //       this.setState({ tempBooks: temp });
    //     })
    //     .catch((err) => console.log(err));
    //   return 0;
    // });
    //get profile
    axios
      .get(`/api/profile/${this.props.match.params.handle}`)
      .then((res) => {
        // console.log(res.data);
        this.setState({ profile: res.data });
      })
      .catch((err) => console.log(err));
  }

  // componentDidUpdate(){}
  render() {
    return (
      <div style={{ marginTop: "1rem" }}>
        <ProfileHeader
          name={this.state.profile.handle}
          address={this.state.profile.location}
          picture={this.state.profile.image}
          library={this.state.library}
          tempBooks={this.state.tempBooks}
          userId={this.state.profile.userId}
          email={this.state.profile.email}
          phone={this.state.profile.phoneNumber}
          social={this.state.profile.social ? this.state.profile.social : {}}
        />
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   user: state.auth.user,
// });

export default Profile;

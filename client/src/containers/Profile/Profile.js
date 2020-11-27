import React, { Component } from "react";
import axios from "axios";
import ProfileHeader from "./Parts/ProfileHeader";
// import { connect } from "react-redux";

class Profile extends Component {
  state = {
    profile: {},
    library: {},
  };

  componentDidMount() {
    //get library
    axios
      .get(`/api/library/getbyname/${this.props.match.params.handle}`)
      .then((res) => {
        this.setState({ library: res.data });
      })
      .catch((err) => console.log(err));

    //get profile
    axios
      .get(`/api/profile/${this.props.match.params.handle}`)
      .then((res) => {
        // console.log(res.data);
        this.setState({ profile: res.data });
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <div style={{ marginTop: "1rem" }}>
        <ProfileHeader
          name={this.state.profile.handle}
          location={this.state.profile.location}
          picture={this.state.profile.image}
          library={this.state.library}
        />
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   user: state.auth.user,
// });

export default Profile;

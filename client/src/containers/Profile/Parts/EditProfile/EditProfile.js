import React, { Component } from "react";
import { connect } from "react-redux";
import { setProfile } from "../../../../store/actions/authAction";
// import { MDBInput, MDBBtnGroup } from "mdbreact";
import { editProfile } from "../../../../store/actions/authAction";
import InputGroup from "../../../../components/UI/InputGroup/InputGroup";

import axios from "axios";

import "./EditProfile.css";

class EditProfile extends Component {
  state = {
    fname: "",
    lname: "",
    phone: "",
    location: "",
    image: "",
    youtube: "",
    facebook: "",
    instagram: "",
    twitter: "",
  };
  async componentDidMount() {
    if (this.props.profile) {
      let index = this.props.profile.names.indexOf(" ");
      this.setState({
        fname: this.props.profile.names.substr(0, index),
        lname: this.props.profile.names.substr(index + 1),
        phone: this.props.profile.phoneNumber,
        location: this.props.profile.location,
        image: this.props.profile.image,
        youtube: this.props.profile.social.youtube,
        instagram: this.props.profile.social.instagram,
        twitter: this.props.profile.social.twitter,
        facebook: this.props.profile.social.facebook,
      });
    }
  }

  saveChanges = (e) => {
    e.preventDefault();
    let newProfile = {
      names: this.state.fname + " " + this.state.lname,
      phoneNumber: this.state.phone,
      location: this.state.location,
      social: {
        youtube: this.state.youtube,
        facebook: this.state.facebook,
        twitter: this.state.twitter,
        instagram: this.state.instagram,
      },
    };
    this.props.savechanges(newProfile);
    console.log(this.props.profile);
    this.props.history.push(`/profile/${this.props.profile.handle}`);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeProfile = (e) => {
    const formData = new FormData();
    formData.append("profile-pic", e.target.files[0]);
    axios
      .post("api/profile/change-pic", formData)
      .then((res) => this.setState({ image: res.data.image }))
      .catch((err) => console.log(err));
  };

  getFileName = (str) => {
    if (str === null || str === undefined) {
      return 0;
    }
    return str.split("\\").pop().split("/").pop();
  };

  render() {
    return (
      <div className="container EditProfile">
        <div className="all">
          <div className="edit-header">
            <div className="intro text-center">Edit your profile</div>
            <form className=" profile-image rounded-circle px-1 mt-5">
              <label htmlFor="upload">
                {/* <i className="fas fa-pen"></i> */}
                <img
                  src={
                    "http://localhost:5000/profilePics/" +
                    this.getFileName(this.state.image)
                  }
                  alt="image"
                  className="rounded-circle"
                />
              </label>
              <input
                type="file"
                id="upload"
                style={{ display: "none" }}
                name="profile-pic"
                onChange={this.changeProfile}
                encType="multipart/form-data"
                accept="image/*"
              />
            </form>
          </div>
          {/* </div> */}
          <div className="fields">
            <form onSubmit={this.saveChanges}>
              <div className="form-group mt-3">
                {/* <div className="col-6"> */}
                <label htmlFor="fname">First Name</label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  value={this.state.fname}
                  className="form-control col-6 col-md-7 col-sm-12"
                  placeholder="First name"
                  onChange={this.onChange}
                />
                {/* </div> */}
                {/* <div className="col-6"> */}
                <label htmlFor="lname" className="mt-3">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  value={this.state.lname}
                  className="form-control col-6 col-md-7"
                  placeholder="Last name"
                  onChange={this.onChange}
                />
                {/* </div> */}
              </div>
              <div className="form-group mt-3">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={this.state.location}
                  className="form-control col-6 col-md-7"
                  placeholder="Location"
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={this.state.phone}
                  className="form-control col-6 col-md-7"
                  placeholder="Phone number"
                  onChange={this.onChange}
                />
              </div>
              <div className="info">Update Your social media links</div>
              <div className="social col-md-6 mt-3">
                <InputGroup
                  type="url"
                  placeholder="Youtube"
                  icon="fab fa-youtube"
                  value={this.state.youtube}
                  change={this.onChange}
                  error=""
                  name="youtube"
                />
                <InputGroup
                  type="url"
                  placeholder="Twitter"
                  icon="fab fa-twitter-square"
                  value={this.state.twitter}
                  change={this.onChange}
                  error=""
                  name="twitter"
                />
                <InputGroup
                  type="url"
                  placeholder="Facebook"
                  icon="fab fa-facebook"
                  value={this.state.facebook}
                  change={this.onChange}
                  error=""
                  name="facebook"
                />
                <InputGroup
                  type="url"
                  placeholder="Instagram"
                  icon="fab fa-instagram"
                  value={this.state.instagram}
                  change={this.onChange}
                  error=""
                  name="instagram"
                />
              </div>
              <button type="submit" className="btn btn-primary save mb-4">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  profile: state.auth.profile,
});

const mapDispatchToProps = (dispatch) => ({
  savechanges: (newProfile) => dispatch(editProfile(newProfile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);

import * as actionTypes from "../actionTypes";
import axios from "axios";

import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//set current profile
export const setProfile = (payload) => {
  return {
    type: actionTypes.SET_PROFILE,
    payload: payload,
  };
};

//user log in
export const logInUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      //save to localStorage
      const { token } = res.data;
      //set token to ls
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);

      //setting the profile
      axios
        .get("api/profile/current")
        .then((res) => {
          dispatch(setCurrentUser(decoded));
          dispatch(setProfile(res.data));
        })
        .catch((err) => console.log(err));

      // isAuthenticated = true

      //set current profile

      // console.log(decoded);
      // .catch(err => (Object.keys(err)).length !== 0 ? this.setState({errors : err.response.data}) : this.setState({errors:{}}))
    })
    .catch((err) =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setCurrentUser = (user) => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: user,
  };
};

//user register
export const registerUser = (newUser, history) => (dispatch) => {
  axios
    .post("/api/users/register", newUser)
    .then((res) => {
      history.push({ pathname: "/login", state: { new: true } });
      // dispatch(logInUser({email: res.data.email, password: res.data.email}))
    })
    .catch((err) =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data,
      })
    );
  // .catch(err => (Object.keys(err)).length !== 0 ? this.setState({errors : err.response.data}) : this.setState({errors:{}}))
};

//create new profile
export const createProfile = () => (dispatch) => {
  axios
    .post("api/profile")
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
};

//edit profile
export const editProfile = (newProfile) => (dispatch) => {
  console.log(newProfile);
  axios
    .post("/api/profile/edit", newProfile)
    .then((res) =>
      dispatch({
        type: actionTypes.SET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) => console.log(err));
};

//logout

export const removeUser = () => {
  return {
    type: actionTypes.LOG_OUT,
    payload: {},
  };
};
export const logOut = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("persist:root");
  setAuthToken(false);
  dispatch(removeUser());
};

import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


//user log in
export const logInUser = (userData) => dispatch =>{
    axios.post("/api/users/login", userData)
        .then(res => {
            //save to localStorage
            const { token } = res.data;
            //set token to ls
            localStorage.setItem("jwtToken", token);
            //set token to auth header
            setAuthToken(token);
            //decode token to get user data
            const decoded = jwt_decode(token);
            // isAuthenticated = true
            dispatch(setCurrentUser(decoded));
            // .catch(err => (Object.keys(err)).length !== 0 ? this.setState({errors : err.response.data}) : this.setState({errors:{}}))
        })
        .catch(err => console.log(err))
}

export const setCurrentUser = (user)=> {
    return{
        type: actionTypes.SET_CURRENT_USER,
        payload: user
    }
}

//user register
export const registerUser = (newUser, history) => dispatch => {
    axios.post("/api/users/register", newUser)
        .then(res => {
             history.push('/login')
            // dispatch(logInUser({email: res.data.email, password: res.data.email}))
        })
        .catch(err => console.log(err))
        // .catch(err => (Object.keys(err)).length !== 0 ? this.setState({errors : err.response.data}) : this.setState({errors:{}}))
}


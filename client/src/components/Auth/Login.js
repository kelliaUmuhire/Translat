import React, { Component } from "react";
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import './css/Login.css';
import avatar from '../../img/avatar.png';
import setAuthToken from '../../utils/setAuthToken';
import {logInUser} from '../../store/actions/authAction'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "",
            errors: {},
            isAuthenticated : false
        }
    }

    // componentDidUpdate(prevProps) {
    //     // Typical usage (don't forget to compare props):
    //     if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
    //       this.setState({isAuthenticated : this.props.isAuthenticated})

    //       this.props.history.push('/dashboard')
    //     }
    // }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
        // if (nextProps.errors) {
        //   this.setState({ errors: nextProps.errors });
        // }
    }
    

    submitHandle = (e) => {
        e.preventDefault();

        const userData = {
            email : this.state.email,
            password : this.state.password
        }

        this.props.userLogin(userData)

        // axios.post("/api/users/login", userData)
        //     .then(res => {
        //         //save to localStorage
        //         const { token } = res.data;
        //         //set token to ls
        //         localStorage.setItem("jwtToken", token);
        //         //set token to auth header
        //         setAuthToken(token);
        //         //decode token to get user data
        //         const decoded = jwt_decode(token);
        //         console.log(decoded);
        //         // isAuthenticated = true
        //         this.props.history.push('/dashboard')
        //     })
        //     .catch(err => (Object.keys(err)).length !== 0 ? this.setState({errors : err.response.data}) : this.setState({errors:{}}))
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        if(this.props.isAuthenticated){
            return <Redirect to="/home" />
        }
        return (
            <div id="myModal">
                <div className="modal-dialog modal-login">
                    <div className="modal-content">
                        <div className="model-header">
                            {/* <div className="avatar">
                                <img src={avatar} alt="Avatar" />
                            </div> */}
                            <h4 className="modal-title">Login</h4>
                        </div>
                        <div className="modal-body">
                        <form action="">
                            <div className="form-group">
                                <input type="email" className="form-control" name="email" placeholder="Email" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-lg btn-block login-btn" onClick={this.submitHandle}>login</button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <a href="/">Forgot Password?</a>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    userLogin : (userData) => dispatch(logInUser(userData))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);


import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux'

import './css/Register.css';
import { registerUser } from '../../store/actions/authAction'


class Register extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        password2: "",
        errors: {},
        isAuthenticated: false
    }

    //temp!!

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

        const newUser = {
            name : this.state.name,
            email : this.state.email,
            password : this.state.password,
            password2 : this.state.password2
        }

        this.props.userRegi(newUser, this.props.history)

        // axios.post("/api/users/register", newUser)
        //     .then(res => this.props.history.push('/login'))
        //     .catch(err => (Object.keys(err)).length !== 0 ? this.setState({errors : err.response.data}) : this.setState({errors:{}}))
        // console.log(this.state.errors);

    }

    

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render() {
        return (
            <div id="myModal">
                <div className="modal-dialog modal-register">
                    <div className="modal-content">
                        <div className="model-header">
                            {/* <div className="avatar">
                                <img src={avatar} alt="Avatar" />
                            </div> */}
                            <h4 className="modal-title">Register</h4>
                        </div>
                        <div className="modal-body">
                        <form action="">
                            <div className="form-group">
                                <input type="text" className="form-control" name="name" placeholder="Username" onChange={this.onChange} />
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" name="email" placeholder="Email" onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="password" placeholder="Password" onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="password2" placeholder="Confirm Password" onChange={this.onChange}/>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-lg btn-block register-btn" onClick={this.submitHandle}>register</button>
                            </div>
                        </form>
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
    userRegi : (newUser, history) => dispatch(registerUser(newUser, history))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);


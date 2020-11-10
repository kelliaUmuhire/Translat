import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./Navbar.css";
// import Login from '../../Auth/Login'

class Navbar extends Component {
    render() {
        return(
            <div>
            <nav className="navbar navbar-expand-lg bg-light shadow-sm fixed-top" id="mainNav">
                <div className="container"><a className="navbar-brand js-scroll-trigger" href="#page-top">TransBase</a>
                    <button className="navbar-toggler navbar-toggler-right font-weight-bold bg-dark text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">Menu <i className="fas fa-bars"></i></button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#portfolio">Home</a>
                            </li>
                            <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#about">Discover</a>
                            </li>
                            <li className="nav-item mx-0 mx-lg-1"><Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to="/login">Login</Link>
                            </li>
                            <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="#contact">FAQs</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            </div>
        )
    }
}


export default Navbar;

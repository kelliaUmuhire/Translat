import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import App from "./App";
import axios from "axios";
import reportWebVitals from "./reportWebVitals";
import { MDBContainer } from "mdbreact";
import Footer from "./components/Layout/Footer/Footer";

axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "jwtToken"
);
// axios.defaults.baseURL = "http://localhost:5000/";
ReactDOM.render(
  <React.StrictMode>
    {/* <MDBContainer> */}
    <App />
    {/* </MDBContainer> */}
    {/* <Footer /> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

import "./Footer.css";

const Footer = () => {
  return (
    <MDBFooter className="font-small pt-4 mt-4" color="mdb-color">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Footer content</h5>
            <p>Organize your content</p>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Links</h5>
            <ul>
              <li className="list-unstyled">
                <a href="/nowhere">Link 1</a>
              </li>
              <li className="list-unstyled">
                <a href="/">Link 1</a>
              </li>
              <li className="list-unstyled">
                <a href="/">Link 1</a>
              </li>
              <li className="list-unstyled">
                <a href="/">Link 1</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>&copy; 2020 copyright</MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default Footer;

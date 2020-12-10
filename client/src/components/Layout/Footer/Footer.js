import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

import "./Footer.css";

const Footer = () => {
  return (
    <div className="font-small pt-4 mt-4 Footer">
      {/* <MDBContainer fluid className="text-center pb-4"> */}
      {/* <MDBRow> */}
      {/* <MDBCol md="6"> */}
      {/* <a href="/">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="/">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="/">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="/">
          <i className="fab fa-slack-hash"></i>
        </a> */}
      {/* </MDBCol> */}
      {/* </MDBRow> */}
      {/* </MDBContainer> */}
      <div className="footer-copyright text-center py-2">
        <MDBContainer fluid>&copy; 2020 copyright</MDBContainer>
      </div>
    </div>
  );
};

export default Footer;

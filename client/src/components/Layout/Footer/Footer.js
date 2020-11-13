import React from "react";

import "./Footer.css";

const Footer = () => {
  return (
    <div className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} T/B
    </div>
  );
};

export default Footer;

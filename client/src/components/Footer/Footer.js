import React from "react";
import cx from "classnames";
import "./Footer.scss";

const Footer = (props) => (
  <footer className="container">
    <p>&copy;Water the Trees {new Date().getFullYear()}</p>
  </footer>
);

export default Footer;

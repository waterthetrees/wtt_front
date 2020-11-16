import React from "react";
import "./Footer.scss";
import { Link } from 'react-router-dom'

const Footer = (props) => (
  <div className="footer">
    <div className="footer__content">
      <Link to={'/privacy'} />
      <Link to={'/terms'} />
    </div>
  </div>
);
     
export default Footer;
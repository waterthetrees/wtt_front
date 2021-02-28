import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => (
  <div className="footer">
    <div className="footer__content">
      <Link to="/contact" className="footer__link">
        Contact
      </Link>
      <Link to="/privacy" className="footer__link">
        Privacy Policy
      </Link>
      <Link to="/license" className="footer__link">
        License
      </Link>
    </div>
  </div>
);

export default Footer;
